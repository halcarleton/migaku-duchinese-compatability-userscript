# Migaku x DuChinese Compatibility User Script

This user script is intended to make the DuChinese web application compatible with the Migaku language learning browser extension. It accomplishes this primarily by replacing DuChinese's dynamic lesson text with plain text, which allows Migaku to read the text and inject it's dynamic UI elements.

## Installation

Releases are tagged on the `release` branch using semantic versioning. All released versions can be found on the [tags page of this repository](https://github.com/halcarleton/migaku-duchinese-compatability-userscript/tags).

### Greasy Fork

The user script is registered on GreasyFork at the below url. It is configured to automatically update when a new release is published on this repository.

<https://greasyfork.org/en/scripts/517065-migaku-duchinese-compatability-userscript>

Instructions explaining how to install a user script through Greasy Fork can be found [here](https://greasyfork.org/en/help/installing-user-scripts).

## Usage

Once the User Script has been installed on your preferred user script manager and is enabled it will automatically run on any DuChinese lesson. You can temporarily disable the user script through the user script manager to access DuChinese's standard UI _(page refresh required)_.

### Features

#### Plain Text Lesson Content

The user script will automatically replace the dynamic lesson content with plain text. This allows Migaku to read the text and inject its own dynamic UI.

#### Maintain Migaku Styling On Navigation

The DuChinese web application currently resets the classes set on the document body every time the user navigates. This results in Migaku's injected styling being removed after navigation to a new page. The user script monitors this behavior and restores the removed Migaku classes on the document body when they are removed by DuChinese. The result is consistent Migaku styling when navigating the DuChinese web app.

## Issues

Please report any bugs you find, or submit feedback, through the [issues page of this repository](https://github.com/halcarleton/migaku-duchinese-compatability-userscript/issues).

Before submitting a bug report or feedback please check the existing issues to be sure it hasn't already been reported.
