# Changelog
All notable changes to this project will be documented in this file.

## [1.1.0] - 2017-09-27
### Added
- Fallback to `Date.now()` if `performance.now()` is not supported to support for browsers (mainly to support IE9 and Android 4.1).
- Adds Changelog.md.
- Update support list and bundle size.
### Changed
- Due to the `performance.now()` fallback the start time is necessary and throws an error if missing.

## [1.0.0] - 2017-08-14
Initial release
