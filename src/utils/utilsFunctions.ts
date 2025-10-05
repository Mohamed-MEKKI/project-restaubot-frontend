const Validate = (requiredFields, formData) => {
    return requiredFields.reduce((acc, field) => {
      const value = formData.get(field);
      if (!value || (field === 'image' && value.size === 0)) {
        acc[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
      return acc;
    }, {});
  };

export { Validate };