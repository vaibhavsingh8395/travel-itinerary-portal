/**
 * LocalStorage Repository Abstraction for Offline/Demo Mode
 */
const STORAGE_KEY = 'travel_portal_requests';

export const DemoRepository = {
  fetchRequests(userEmail = null, role = 'user') {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (role === 'admin') {
      return data;
    }
    return data.filter(req => req.user === userEmail);
  },

  saveRequest(requestData) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const newEntry = {
      id: 'REQ-' + Date.now().toString().slice(-6),
      ...requestData,
      status: 'Pending Review',
      submitted_at: new Date().toISOString()
    };
    data.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newEntry;
  },

  updateStatus(requestId, newStatus) {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = data.findIndex(req => req.id === requestId);
    if (index !== -1) {
      data[index].status = newStatus;
      data[index].updated_at = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data[index];
    }
    throw new Error(`Request ID ${requestId} not found.`);
  }
};
