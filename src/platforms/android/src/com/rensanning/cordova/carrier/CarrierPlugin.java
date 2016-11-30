package com.rensanning.cordova.carrier;

import android.content.Context;
import android.telephony.TelephonyManager;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.json.JSONArray;
import org.json.JSONException;

public class CarrierPlugin extends CordovaPlugin {
    public static final String TAG = "CarrierPlugin";
    public static final String ACTION_GET_CARRIER_CODE = "getCarrierCode";
    public TelephonyManager tm;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        Context context = this.cordova.getActivity().getApplicationContext();
        tm = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (ACTION_GET_CARRIER_CODE.equals(action)) {
            String carrier = tm.getSimCountryIso();
            Log.d(TAG, carrier);
            callbackContext.success(carrier);
            return true;
        }
        return true;
    }
}