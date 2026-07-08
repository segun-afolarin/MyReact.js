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

export const getReportStats = () =>
  api.get("/reports/stats").then((res) => res.data);

// The axios instance sets a default Content-Type: application/json header.
// That default persists even for FormData requests unless we explicitly
// clear it here — so we force it to undefined, letting the browser set
// the correct multipart/form-data boundary itself. Without this, Laravel
// can never parse the uploaded files (every image field looks invalid).
export const submitReport = (formData) =>
  api
    .post("/reports", formData, {
      headers: { "Content-Type": undefined },
    })
    .then((res) => res.data);

export const confirmReport = (reportId, formData) =>
  api
    .post(`/reports/${reportId}/confirm`, formData, {
      headers: { "Content-Type": undefined },
    })
    .then((res) => res.data);