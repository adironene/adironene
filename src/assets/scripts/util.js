export async function fetchCSSAsString(cssFilePath) {
  try {
    const response = await fetch(cssFilePath);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const cssText = await response.text();
    return cssText;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

/**
 * Fetches JSON data from the specified file and returns it as an array of objects.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of restaurant objects.
 */
export function fetchJSONData() {
  return fetch("../food/assets/restaurants.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      throw error; // Rethrow the error to be caught in the init function
    });
}
