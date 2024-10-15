// const validate = (values) => {
//     let validationErrors = {};

//     // Validate title
//     if (!values.title) {
//         validationErrors.title = "Title is required";
//     } else if (values.title.length < 3 || values.title.length > 100) {
//         validationErrors.title = "Title must be between 3 and 100 characters";
//     }

//     // Validate description
//     if (!values.description) {
//         validationErrors.description = "Description is required";
//     } else if (values.description.length < 10 || values.description.length > 500) {
//         validationErrors.description = "Description must be between 10 and 500 characters";
//     }

//     // Validate image URL
//     if (!values.image) {
//         validationErrors.image = "Image URL is required";
//     } else if (!/^(https?:\/\/)/.test(values.image)) {
//         validationErrors.image = "Image URL must start with http:// or https://";
//     }

//     // Validate date
//     if (!values.date) {
//         validationErrors.date = "Date is required";
//     } else if (isNaN(new Date(values.date).getTime())) {
//         validationErrors.date = "Date is invalid";
//     }

//     // Validate URL
//     if (!values.url) {
//         validationErrors.url = "URL is required";
//     } else if (!/^(https?:\/\/)/.test(values.url)) {
//         validationErrors.url = "URL must start with http:// or https://";
//     }

//     return validationErrors;
// };
