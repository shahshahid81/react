import classes from './loading.module.css';

// This component will be rendered while the data is getting loaded for current page for all siblings and nested pages and layouts
// This will work when the file is named loading.js, but the file is renamed to loading-out.js because we will be adding partial loader to the page
export default function MealsLoadingPage() {
  return <p className={classes.loading}>Fetching Meals...</p>;
}
