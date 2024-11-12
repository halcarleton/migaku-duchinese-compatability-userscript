import { separateCharacterTypes } from "./content-operations";
import { onCharSetChange } from "./dom-operations/events";
import {
  applyPlainTextUI,
  getLessonElements,
  getLessonTextContent,
  type LessonElements,
} from "./dom-operations/lesson";
import { Store } from "./store";
import { CharSet } from "./types/shared";

interface State {
  characterSet: CharSet;
  loading: boolean;
  mounted: boolean;
  textContent: string;
}

interface References {
  lessonElements: LessonElements;
}

const initialState: State = {
  characterSet: CharSet.traditional,
  loading: true,
  mounted: false,
  textContent: "",
};

interface InitializedActions {
  mount: () => Promise<void>;
  mounted: () => boolean;
  refresh: () => Promise<void>;
  unmount: () => Promise<void>;
}

interface InitializeInternal extends InitializedActions {
  references: References | null;
  store: Store<State>;
}

async function getReferences(): Promise<References> {
  const lessonElements = await getLessonElements();
  return { lessonElements };
}

export default async function intialize(): Promise<InitializedActions> {
  const internal: InitializeInternal = {
    async mount() {
      if (this.mounted() || this.references) {
        return;
      }

      this.references = await getReferences();

      onCharSetChange(({ charSet }) => {
        this.store.setState((state) => ({ ...state, charSet }));
      }, this.references.lessonElements.pageFooter);

      await applyPlainTextUI(this.references.lessonElements);
      this.store.setState((state) => ({ ...state, mounted: true }));

      await this.refresh();
    },
    mounted() {
      return this.store.getState().mounted;
    },
    references: null,
    async refresh() {
      if (this.mounted() && this.references) {
        this.store.setState((state) => ({ ...state, loading: true }));

        const textContent = await getLessonTextContent(
          this.references.lessonElements.lessonContent,
          this.store.getState().textContent
        );

        this.store.setState((state) => ({
          ...state,
          loading: false,
          textContent,
        }));
      }
    },
    store: new Store(initialState),
    async unmount() {
      this.store.setState(() => {
        this.references = null;
        return initialState;
      });
    },
  };

  internal.store.onStateChange((event) => {
    const { previous, state } = event.detail;

    if (!state.mounted || !internal.references) return;

    if (previous.characterSet !== state.characterSet) {
      internal.references.lessonElements.lessonContent.plainTextLessonContent.characterSet =
        state.characterSet;
    }

    if (previous.textContent !== state.textContent) {
      const { simplified, traditional } = separateCharacterTypes(
        state.textContent
      );
      internal.references.lessonElements.lessonContent.plainTextLessonContent.simplified =
        simplified;
      internal.references.lessonElements.lessonContent.plainTextLessonContent.traditional =
        traditional;
    }

    if (previous.loading !== state.loading) {
      internal.references.lessonElements.lessonContent.plainTextLessonContent.loading =
        state.loading;
    }
  });

  return {
    mount: internal.mount.bind(internal),
    mounted: internal.mounted.bind(internal),
    refresh: internal.refresh.bind(internal),
    unmount: internal.unmount.bind(internal),
  };
}
