'use strict';

module.exports = function webClientSetup({
  http,
  https,
  logService,
  serializationService
}) {
  const { toJSON } = serializationService;

  const response = (res, body) => {
    if (res.headers['content-type'].includes('application/json')) {
      body = toJSON(body);
    }
    logService.info({ body }, '<- Response body');
    return { headers: res.headers, body };
  };

  const fetch = (options, postData) => new Promise((resolve, reject) => {
    const protocol = options.protocol === 'https:' ? https : http;
    const req = protocol.request(options, (res) => {
      // logService.info({ resHeaders: res.headers }, '<- Response headers');
      const buffer = [];
      res.setEncoding('utf8');
      res.on('data', (chunk) => buffer.push(chunk));
      res.on('end', () => {
        if (res.statusCode < 200 && res.statusCode > 299) {
          const err = new Error(`WebClient: Response ${res.statusCode} ${res.statusMessage}`);
          err.statusCode = res.statusCode;
          err.statusMessage = res.statusMessage;
          err.response = response(res, buffer.join(''));
          return reject(err);
        }
        resolve(
          response(res, buffer.join(''))
        );
      });
    });

    req.on('error', (err) => {
      logService.error({ err }, 'WebClient: Error occurred while processing request!');
    });
    
    if (postData) req.write(postData);
    req.end();
    // logService.info({ reqHeaders: req._header }, '-> Request headers');
    // logService.info({ req }, 'Artstation: Post Vote API request');
  });
  
  return {
    fetch
  };
};