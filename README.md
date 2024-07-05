# ResumeBuilder

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Developer Documentation
Resume Builder Component
The `ResumeBuilderComponent` is a specialized Angular component designed to facilitate the creation and customization of resumes within Angular applications. It leverages Angular's component architecture and integrates third-party libraries like `html2canvas` and `jspdf` for PDF generation.

## Key Components:

## Data Structure:
Uses a structured data model `(resumeValue)` to store resume details such as `profile information`, `work experiences`, `educations`, `projects`, and `skills`.

## Dynamic Textarea Handling:
Implements `autoResize()` method to dynamically adjust textarea heights based on content, enhancing user experience during editing.

## PDF Export:
Utilizes `html2canvas` for capturing resume content as an image and jspdf for converting it into a multi-page `PDF document` suitable for export.

## Styling Customization:
Integrates CSS variables to dynamically change theme colors `(--theme-color)`, `font family` `(--font-family)`, and font size `(--font-size)` based on user preferences.

## User Documentation

## Resume Builder

Features:

## Customizable Resume Sections:
Add and manage multiple sections such as `work experiences`, `education`, `projects`, and `skills`.

## Theme Customization:
Choose from a variety of theme colors and font families to personalize your resume's appearance.

## Export to PDF:
Export your completed resume as a PDF document, ready for printing or digital sharing.
