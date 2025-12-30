// Validation utility functions for forms

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation
export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === "") {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return null;
};

// Password validation
export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === "") {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (password.length > 100) {
    return "Password must not exceed 100 characters";
  }
  return null;
};

// Name validation
export const validateName = (name: string): string | null => {
  if (!name || name.trim() === "") {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters long";
  }
  if (name.length > 100) {
    return "Name must not exceed 100 characters";
  }
  return null;
};

// Phone validation (Pakistani format with international support)
export const validatePhone = (phone: string, required: boolean = false): string | null => {
  if (!phone || phone.trim() === "") {
    return required ? "Phone number is required" : null;
  }
  
  // Remove all spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  
  // Check if it's a valid international format or Pakistani format
  const phoneRegex = /^(\+?\d{1,4})?[\d]{10,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return "Please enter a valid phone number";
  }
  
  return null;
};

// Role validation
export const validateRole = (role: string): string | null => {
  const validRoles = ["user", "agent", "admin"];
  if (!role || !validRoles.includes(role)) {
    return "Please select a valid role";
  }
  return null;
};

// Status validation
export const validateStatus = (status: string, role: string): string | null => {
  // Status only applies to agents
  if (role !== "agent") {
    return null;
  }
  
  const validStatuses = ["active", "pending", "suspended", "inactive"];
  if (!status || !validStatuses.includes(status)) {
    return "Please select a valid status";
  }
  return null;
};

// Register form validation
export const validateRegisterForm = (form: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  termsAccepted?: boolean;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  const nameError = validateName(form.name);
  if (nameError) errors.push({ field: "name", message: nameError });

  const emailError = validateEmail(form.email);
  if (emailError) errors.push({ field: "email", message: emailError });

  const phoneError = validatePhone(form.phone, true);
  if (phoneError) errors.push({ field: "phone", message: phoneError });

  const passwordError = validatePassword(form.password);
  if (passwordError) errors.push({ field: "password", message: passwordError });

  const roleError = validateRole(form.role);
  if (roleError) errors.push({ field: "role", message: roleError });

  if (form.termsAccepted === false) {
    errors.push({ field: "terms", message: "You must accept the Terms of Service and Privacy Policy" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Login form validation
export const validateLoginForm = (form: {
  email: string;
  password: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(form.email);
  if (emailError) errors.push({ field: "email", message: emailError });

  const passwordError = validatePassword(form.password);
  if (passwordError) errors.push({ field: "password", message: passwordError });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// User form validation (for admin create/edit)
export const validateUserForm = (form: {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  role: string;
  status?: string;
}, isEdit: boolean = false): ValidationResult => {
  const errors: ValidationError[] = [];

  const nameError = validateName(form.name);
  if (nameError) errors.push({ field: "name", message: nameError });

  const emailError = validateEmail(form.email);
  if (emailError) errors.push({ field: "email", message: emailError });

  const phoneError = validatePhone(form.phone || "", false);
  if (phoneError) errors.push({ field: "phone", message: phoneError });

  // Password is required only for create, optional for edit
  if (!isEdit && form.password) {
    const passwordError = validatePassword(form.password);
    if (passwordError) errors.push({ field: "password", message: passwordError });
  } else if (!isEdit && !form.password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  const roleError = validateRole(form.role);
  if (roleError) errors.push({ field: "role", message: roleError });

  const statusError = validateStatus(form.status || "", form.role);
  if (statusError) errors.push({ field: "status", message: statusError });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Get error message for a specific field
export const getFieldError = (errors: ValidationError[], field: string): string | undefined => {
  return errors.find((error) => error.field === field)?.message;
};

// Check if field has error
export const hasFieldError = (errors: ValidationError[], field: string): boolean => {
  return errors.some((error) => error.field === field);
};
