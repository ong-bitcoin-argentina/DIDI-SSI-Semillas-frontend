import helpers from './helpers';

const uploadFile = makePostFileRequest => data => makePostFileRequest('credentials/importCredentials', data);


const uploadPdfFile = makePostFileRequest => data => makePostFileRequest('api/file/reportPDF', data);


const validateSancorFile = makePostFileRequest => data =>
    makePostFileRequest('api/file/sancorsalud/validate', data);

const uploadSancorFile = makePostFileRequest => data =>
    makePostFileRequest('api/file/sancorsalud/upload', data);

const files = client => {
  const { makePostFileRequest } = helpers(client);
  return {
    uploadFile: uploadFile(makePostFileRequest),
    validateSancorFile: validateSancorFile(makePostFileRequest),
    uploadSancorFile: uploadSancorFile(makePostFileRequest),
    uploadPdfFile: uploadPdfFile(makePostFileRequest)
  };
};

export default files;