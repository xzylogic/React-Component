import request from '@/utils/request';

export async function fetchGroupListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/hos/search/group${query}`);
}

export async function fetchMemberListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/hos/search/person${query}`);
}

export async function fetchLocationListService(params, page, size) {
  let query = `?page=${page}&size=${size || 10}`;
  if (params) {
    query += `&${params}`;
  }
  return request(`/yilian-cloud-backend-api/hos/search/site${query}`);
}

export async function createGroupService(postData) {
  return request(`/yilian-cloud-backend-api/hos/create/group`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function createMemberService(postData) {
  return request(`/yilian-cloud-backend-api/hos/create/person`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function createLocationService(postData) {
  return request(`/yilian-cloud-backend-api/hos/create/site`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function modifyGroupService(postData) {
  return request(`/yilian-cloud-backend-api/hos/modify/group`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function modifyMemberService(postData) {
  return request(`/yilian-cloud-backend-api/hos/modify/person`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function modifyLocationService(postData) {
  return request(`/yilian-cloud-backend-api/hos/modify/site`, {
    method: 'POST',
    body: {
      ...postData,
    },
  });
}

export async function deleteGroupService(id) {
  return request(`/yilian-cloud-backend-api/hos/delete/group?id=${id}`, {
    method: 'POST',
    body: {},
  });
}

export async function deleteMemberService(id) {
  return request(`/yilian-cloud-backend-api/hos/delete/person?id=${id}`, {
    method: 'POST',
    body: {},
  });
}

export async function deleteLocationService(id) {
  return request(`/yilian-cloud-backend-api/hos/delete/site?id=${id}`, {
    method: 'POST',
    body: {},
  });
}

export async function getMemberService() {
  return request(`/yilian-cloud-backend-api/hos/base/person`);
}