import { IDENTIFIERS as RESOURCE_IDENTIFIERS } from '../../config/resources'

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.rawFile)

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const addUploadCapabilities = (requestHandler) => async (type, resource, params) => {
  let newParams = params
  if (
    (type === 'UPDATE' || type === 'CREATE') &&
    (resource === RESOURCE_IDENTIFIERS.ACCOUNT || resource === RESOURCE_IDENTIFIERS.ACCOUNT)
  ) {
    if (params.data && params.data.uploaded_file) {
      const myFile = params.data.uploaded_file
      if (myFile.rawFile instanceof File) {
        const picture64 = await convertFileToBase64(myFile)
        newParams = {
          ...params,
          data: {
            ...params.data,
            upload_encoded: picture64
          }
        }
      }
    }

    let newBlocks = params.data.content_blocks
    if (params.data && params.data.content_blocks) {
      newBlocks = await Promise.all(
        params.data.content_blocks.map(async (block) => {
          if (block.type === 'PICTURE' && block.uploaded_file) {
            const myFile = block.uploaded_file
            if (myFile.rawFile instanceof File) {
              const picture64 = await convertFileToBase64(myFile)
              return { ...block, upload_encoded: picture64 }
            }
            return block
          }
          return block
        })
      )
    }
    return requestHandler(type, resource, {
      ...newParams,
      data: {
        ...newParams.data,
        content_blocks: newBlocks
      }
    })
  }
  return requestHandler(type, resource, newParams)
}
