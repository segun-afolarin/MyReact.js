// src/utils/api.js
// Thin wrapper around the shared axios instance (src/api/axios.js),
// which already attaches the Bearer token from localStorage("token")
// via its interceptor — same one AuthContext uses for login/register/user.
// This file does NOT manage auth itself; it just defines report endpoints.

import api from "../api/axios";

export const getMyReports = () =>
  api.get("/reports/mine").then((res) => res.data);

export const getConfirmedReports = () =>
  api.get("/reports/confirmed").then((res) => res.data);

export const getNearbyReports = () =>
  api.get("/reports/nearby").then((res) => res.data);

// Do NOT set Content-Type manually for FormData — axios/the browser
// needs to generate it itself so it includes the multipart boundary.
// Setting "multipart/form-data" by hand breaks Laravel's file parsing.
export const submitReport = (formData) =>
  api.post("/reports", formData).then((res) => res.data);

export const confirmReport = (reportId, formData) =>
  api.post(`/reports/${reportId}/confirm`, formData).then((res) => res.data);