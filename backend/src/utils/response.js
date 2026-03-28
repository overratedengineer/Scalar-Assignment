// src/utils/response.js

export const sendSuccess = (res, data, statusCode = 200, meta = {}) => {
    res.status(statusCode).json({
      success: true,
      data,
      ...meta,
    });
  };
  
  export const sendError = (res, message, statusCode = 400, errors = null) => {
    const payload = { success: false, message };
    if (errors) payload.errors = errors;
    res.status(statusCode).json(payload);
  };