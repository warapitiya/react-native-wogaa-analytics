'use strict';

import qs from 'querystring';

/**
 * Convert all fields in a payload dictionary to strings
 *
 * @param {object} payload Payload on which the new dictionary is based
 */
function valuesToStrings(payload) {
  let stringifiedPayload = {};
  for (let key in payload) {
    if (payload.hasOwnProperty(key)) {
      stringifiedPayload[key] = payload[key].toString();
    }
  }
  return stringifiedPayload;
}

class Emitter {
  /**
   * Create an emitter object which will send events to a collector
   *
   * @param endpoint
   * @param protocol
   * @param port
   * @param method
   * @param bufferSize
   * @param callback
   */
  constructor(endpoint, protocol, port, method, bufferSize, callback) {
    this.protocol = (protocol || 'http').toLowerCase();
    this.method = (method || 'get').toLowerCase();
    this.bufferSize = bufferSize;
    if (bufferSize === null || typeof bufferSize === 'undefined') {
      this.bufferSize = method === 'get' ? 0 : 10;
    }
    this.callback = callback;

    let portString = port ? ':' + port : '';
    let path = method === 'get' ? '/i' : '/com.snowplowanalytics.snowplow/tp2';
    this.targetUrl = protocol + '://' + endpoint + portString + path;

    this.buffer = [];
  }

  /**
   * Send all events queued in the buffer to the collector
   */
  flush() {
    let temp = this.buffer;
    this.buffer = [];

    if (this.method === 'post') {
      let postJson = {
        schema: 'iglu:com.snowplowanalytics.snowplow/payload_data/jsonschema/1-0-0',
        data: temp.map(valuesToStrings)
      };

      fetch(this.targetUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(postJson)
      })
        .then((response) => this.handleResponseAndCallback(response))
        .catch((e) => { this.callback(e) });
    } else {
      for (let i = 0; i < temp.length; i++) {
        let url = `${this.targetUrl}?${qs.stringify(temp[i])}`;

        fetch(url, {
          method: 'GET'
        })
          .then((response) => this.handleResponseAndCallback(response))
          .catch((e) => { this.callback(e) });
      }
    }
  }

  /**
   * Send input
   *
   * @param payload
   */
  input(payload) {
    this.buffer.push(payload);
    if (this.buffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  /**
   * Handle the response and calls the callback function
   *
   * @private
   * @param {Response} response
   */
  handleResponseAndCallback(response) {
    return this.callback(response.ok === true ? null : response.status, response);
  }
}

export default Emitter;
