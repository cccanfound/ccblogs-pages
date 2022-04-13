import request from "@/utils/request";

export const getAllGroups = () => request.post('/api/v1/pri/status/getAllGroups', {

})

export const getAllStatusDef = () => request.post('/api/v1/pri/status/getAllStatusDef', {

})

export const saveGroupDefRelation = (id,list) => request.post('/api/v1/pri/status/saveGroupDefRelation', {
  'groupId': id,
  'defIds': list
})

export const getGroupDefRelation = (id) => request.post('/api/v1/pri/status/getGroupDefRelation', {
  'groupId': id,
})
export const getGroupDefRelationInfo = (id) => request.post('/api/v1/pri/status/getGroupDefRelationInfo', {
  'groupId': id,
})
export const addStatusDef = (formData) => request.post('/api/v1/pri/status/addStatusDef', {
  'name': formData.name,
  'unit': formData.unit,
  'floor': formData.floor,
  'ceiling': formData.ceiling
})

export const getStatusDefInfo = (defId) => request.post('/api/v1/pri/status/getStatusDefInfo', {
  'defId': defId
})

export const updateStatusDef = (formData) => request.post('/api/v1/pri/status/updateStatusDef', {
  'id':formData.id,
  'name': formData.name,
  'unit': formData.unit,
  'floor': formData.floor,
  'ceiling': formData.ceiling
})

export const getStatusInfoOfSingleDef = (defId) => request.post('/api/v1/pri/status/getStatusInfoOfSingleDef', {
  'defId': defId
})

export const editStatusInfo = (formData,statusDefId) => request.post('/api/v1/pri/status/editStatusInfo', {
  'id': formData.infoId,
  'statusId': statusDefId,
  'val': formData.val,
  'createTime': formData.createTime,
  'locationId': formData.locationId,
  'remark': formData.remark,
  'danger': formData.danger
})

export const deleteStatusInfo = (currentRow) => request.post('/api/v1/pri/status/deleteStatusInfo', {
  'id': currentRow.infoId
})


export const getLocation = () => request.post('/api/v1/pri/status/getLocation', {

})

export const getStatusIndex = (groupValue,statusDefValue,dangerValue,locationValue) => request.post('/api/v1/pri/status/getStatusIndex', {
  'groupId': groupValue,
  'defId': statusDefValue,
  'dangerId': dangerValue,
  'locationId': locationValue
})

