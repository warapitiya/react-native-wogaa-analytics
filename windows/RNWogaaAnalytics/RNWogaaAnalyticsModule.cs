using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Wogaa.Analytics.RNWogaaAnalytics
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNWogaaAnalyticsModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNWogaaAnalyticsModule"/>.
        /// </summary>
        internal RNWogaaAnalyticsModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNWogaaAnalytics";
            }
        }
    }
}
