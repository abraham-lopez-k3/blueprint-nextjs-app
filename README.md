# Service Blueprint App

This is a web application built with [Next.js](https://nextjs.org) that allows users to create, edit, and manage service blueprints. The app is designed to be simple yet powerful, providing users with the ability to add, reorder, and modify stages in a service blueprint, and export their work to PDF or JSON.

## Features

- **Interactive Stage Management**: Add, edit, delete, and reorder stages.
- **Customizable Blueprints**: Modify various details of each stage.
- **Export Options**: Save blueprints as PDF or JSON files.
- **Responsive Design**: Optimized for various screen sizes.
- **Offline Storage**: Blueprints are saved locally using `localStorage`.

## Getting Started

### Prerequisites

To run this application locally, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/humpherson/blueprint-app.git
cd blueprint-app``
```

Install the dependencies:

```bash
npm install
```

### Development

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

The app will automatically reload when you make changes to the code.

### Building for Production

To build the app for production:

```bash
npm run build
```

To start the production server after building:

```bash
npm run start
```

### Deployment

The app is deployed using GitHub Pages on a custom domain [https://www.objetd.co.uk](https://www.objetd.co.uk). The deployment is configured with a custom `next.config.mjs` to handle static paths correctly.

To deploy to GitHub Pages:

1.  Ensure your `next.config.mjs` is correctly set up to use the `assetPrefix` and `basePath` configurations.

2.  Run:
    ```bash
    npm run build
    npm run export
    ```
3.  Push the changes to the `gh-pages` branch of your repository.

## Libraries and Frameworks

### Core Framework

- **[Next.js](https://nextjs.org/)**: React-based framework for building server-side and static web applications.

### UI Libraries

- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
- **React Icons**: Icon library used for stage controls (Edit, Delete, Left, Right).

### Other Libraries

- **[html2pdf.js](https://github.com/eKoopmans/html2pdf.js/)**: Used for exporting blueprints as PDF.
- **react-icons**: Provides icons for the UI.

## Technical Design

### Blueprint Management

The app uses a **local state** approach for managing blueprints, with each stage in a blueprint represented as an object containing details such as position, name, and actions. The data is stored in `localStorage` to persist user inputs across sessions.

### Reordering and Editing

Reordering is facilitated by dynamically adjusting the `position` property, which allows stages to be moved up or down. Changes are saved immediately to ensure consistency.

### PDF and JSON Export

Blueprints can be exported as PDFs for easy sharing, using the `html2pdf.js` library. Users can also download the blueprint as a JSON file, which can be re-uploaded later to restore the same configuration.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for new features or improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
