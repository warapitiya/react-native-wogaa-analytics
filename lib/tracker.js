'use strict';

import { trackerCore } from 'snowplow-tracker-core';

const DEFAULT_PLATFORM = 'mob';
const DEFAULT_TRACKER_VERSION = `wogaa-rn-0.0.1`;

class Tracker {
  /**
   * Snowplow React Native Tracker
   *
   * @param {Emitter|Array<Emitter>} emitters The emitter or emitters to which events will be sent
   * @param {String} namespace The namespace of the tracker
   * @param {String} appId The application ID
   * @param {Boolean} encodeBase64 Whether unstructured events and custom contexts should be base 64 encoded
   */
  constructor(emitters, namespace, appId, encodeBase64 = true) {
    emitters = emitters instanceof Array ? emitters : [emitters];
    encodeBase64 = encodeBase64 !== false;

    // configure core tracker
    this.core = trackerCore(encodeBase64, (payload) => {
      let builtPayload = payload.build();
      for (let i = 0; i < this.emitters.length; i++) {
        this.emitters[i].input(builtPayload);
      }
    });

    this.emitters = emitters;

    // set defaults
    this.core.setPlatform(DEFAULT_PLATFORM);
    this.core.setTrackerVersion(DEFAULT_TRACKER_VERSION);
    this.core.setTrackerNamespace(namespace);
    this.core.setAppId(appId);
  }

  /**
   * Set the domain_user_id
   *
   * @param {String} duid
   */
  setDomainUserId(duid) {
    this.core.addPayloadPair('duid', duid);
  }

  // expose other core tracker methods
  /* eslint-disable */
  setPlatform(val) { this.core.setPlatform(val) }
  setUserId(val) { this.core.setUserId(val) }
  setScreenResolution(width, height) { this.core.setScreenResolution(width, height) }
  setViewport(width, height) { this.core.setViewport(width, height) }
  setColorDepth(val) { this.core.setColorDepth(val) }
  setTimezone(val) { this.core.setTimezone(val) }
  setLang(val) { this.core.setLang(val) }

  trackScreenView(name, id, context, tstamp) { this.core.trackScreenView(name, id, context, tstamp) }
  trackPageView(pageUrl, pageTitle, referrer, context, tstamp) { this.core.trackPageView(pageUrl, pageTitle, referrer, context, tstamp) }
  trackPagePing(pageUrl, pageTitle, referrer, minXOffset, maxXOffset, minYOffset, maxYOffset, context, tstamp) {
    this.core.trackPagePing(pageUrl, pageTitle, referrer, minXOffset, maxXOffset, minYOffset, maxYOffset, context, tstamp)
  }

  trackStructEvent(category, action, label, property, value, context, tstamp) { this.core.trackStructEvent(category, action, label, property, value, context, tstamp) }
  trackUnstructEvent(properties, context, tstamp) { this.core.trackUnstructEvent(properties, context, tstamp) }
  /* eslint-enable */
}

export default Tracker;
