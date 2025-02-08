import { ThemeProvider } from "../components/ThemeProvider";

export default function Layout({ children }) {
  return (
    <ThemeProvider>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </div>
    </ThemeProvider>
  );
}
