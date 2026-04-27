const baseURL = process.env.BASE_URL;

export function extractFields(contentFields, fields) {
  const result = {};
  contentFields?.forEach((field) => {
    if (field.dataType === "image") {
      if (fields.includes(field.name)) {
        result[field.name] =
          `${baseURL}${field.contentFieldValue?.image?.contentUrl}` ?? "";
      }
    } else {
      if (fields.includes(field.name)) {
        result[field.name] = field.contentFieldValue?.data ?? "";
      }
    }
  });
  return result;
}

export function extractList(contentFields, fieldsetName, mapping) {
  return (
    contentFields
      ?.filter((field) => field.name === fieldsetName)
      .flatMap(
        (field) =>
          // If nestedContentFields is a flat array, not array of arrays:
          [field.nestedContentFields]?.map((nestedFields) => {
            const obj = {};
            nestedFields?.forEach?.((nestedField) => {
              if (nestedField.dataType === "image") {
                if (mapping[nestedField.name]) {
                  obj[mapping[nestedField.name]] = nestedField.contentFieldValue
                    ?.image?.contentUrl
                    ? `${baseURL}${nestedField.contentFieldValue.image.contentUrl}`
                    : "";
                }
              } else {
                if (mapping[nestedField.name]) {
                  obj[mapping[nestedField.name]] =
                    nestedField.contentFieldValue?.data ?? "";
                }
              }
            });
            return obj;
          }) ?? []
      ) ?? []
  );
}

export function extractListWithSubListOriginalKeys(
  contentFields,
  fieldsetName,
  mapping,
  subListName
) {
  return (
    contentFields
      ?.filter((field) => field.name === fieldsetName)
      .flatMap(
        (field) =>
          [field.nestedContentFields]?.map((nestedFields) => {
            const obj = {};

            nestedFields?.forEach?.((nestedField) => {
              // If this is the sublist container
              if (
                nestedField.name === subListName &&
                Array.isArray(nestedField.nestedContentFields)
              ) {
                // Keep original keys from nested fields
                obj[subListName] = obj[subListName] || [];
                obj[subListName].push(
                  mapFieldsKeepOriginal(
                    nestedField.nestedContentFields,
                    baseURL
                  )
                );
              }
              // Normal field mapping
              else if (mapping[nestedField.name]) {
                if (nestedField.dataType === "image") {
                  obj[mapping[nestedField.name]] = nestedField.contentFieldValue
                    ?.image?.contentUrl
                    ? `${baseURL}${nestedField.contentFieldValue.image.contentUrl}`
                    : "";
                } else {
                  obj[mapping[nestedField.name]] =
                    nestedField.contentFieldValue?.data ?? "";
                }
              }
            });

            return obj;
          }) ?? []
      ) ?? []
  );
}

// Helper: keeps original field names like testNameText, testParagraph
function mapFieldsKeepOriginal(fields, baseURL) {
  const obj = {};
  fields?.forEach?.((field) => {
    if (field.dataType === "image") {
      obj[field.name] = field.contentFieldValue?.image?.contentUrl
        ? `${baseURL}${field.contentFieldValue.image.contentUrl}`
        : "";
    } else {
      obj[field.name] = field.contentFieldValue?.data ?? "";
    }
  });
  return obj;
}

export function extractImageList(contentFields, fieldName) {
  // Find all fields with the specified name and dataType "image"
  const imageFields = contentFields?.filter(
    (field) => field.name === fieldName && field.dataType === "image"
  );

  if (!imageFields || imageFields.length === 0) {
    return [];
  }

  return imageFields
    .map((imageField) => {
      return imageField.contentFieldValue?.image?.contentUrl
        ? `${baseURL}${imageField.contentFieldValue.image.contentUrl}`
        : "";
    })
    .filter((url) => url !== "");
}

/**
 * Extracts FAQ tabs with their associated Q&A lists from content fields.
 * Supports multiple candidate field names for backward/forward compatibility.
 * @param {Array} contentFields - The content fields from the API response
 * @param {string} tabFieldsetName - The name of the tab fieldset (e.g., "TabFieldset")
 * @param {string} faqFieldsetName - The name of the FAQ fieldset (e.g., "FAQFieldset")
 * @param {string} tabTitleFieldName - The name of the tab title field (e.g., "tabTitleText")
 * @param {string|string[]} faqQuestionFieldName - FAQ question field name(s)
 * @param {string|string[]} faqAnswerFieldName - FAQ answer field name(s)
 * @returns {Array} Array of tab objects with title and faqs array
 */
export function extractFAQTabs(
  contentFields,
  tabFieldsetName = "TabFieldset",
  faqFieldsetName = "FAQFieldset",
  tabTitleFieldName = "tabTitleText",
  faqQuestionFieldName = ["fqaQuestionText", "faqQuestionText", "questionText", "question"],
  faqAnswerFieldName = ["faqAnswerText", "answerText", "answer"]
) {
  if (!contentFields || !Array.isArray(contentFields)) {
    return [];
  }

  const questionNames = Array.isArray(faqQuestionFieldName)
    ? faqQuestionFieldName
    : [faqQuestionFieldName];
  const answerNames = Array.isArray(faqAnswerFieldName)
    ? faqAnswerFieldName
    : [faqAnswerFieldName];

  return contentFields
    .filter((field) => field.name === tabFieldsetName)
    .map((tabField, tabIndex) => {
      const tab = {
        id: `tab${tabIndex + 1}`,
        title: "",
        faqs: [],
      };

      // Extract tab title and FAQs from nested content fields
      if (
        tabField.nestedContentFields &&
        Array.isArray(tabField.nestedContentFields)
      ) {
        tabField.nestedContentFields.forEach((nestedField) => {
          // Extract tab title
          if (nestedField.name === tabTitleFieldName) {
            tab.title = nestedField.contentFieldValue?.data || "";
          }

          // Extract FAQ items
          if (
            nestedField.name === faqFieldsetName &&
            nestedField.nestedContentFields
          ) {
            const faq = {
              id: tab.faqs.length + 1,
              question: "",
              answer: "",
            };

            nestedField.nestedContentFields.forEach((faqField) => {
              // Try all candidate question field names
              if (questionNames.includes(faqField.name)) {
                faq.question = faqField.contentFieldValue?.data || "";
              }
              // Try all candidate answer field names
              else if (answerNames.includes(faqField.name)) {
                faq.answer = faqField.contentFieldValue?.data || "";
              }
            });

            // Include FAQ if it has at least a question (answer can be empty)
            if (faq.question) {
              tab.faqs.push(faq);
            }
          }
        });
      }

      return tab;
    })
    .filter((tab) => tab.title && tab.faqs.length > 0); // Only return tabs with title and FAQs
}
