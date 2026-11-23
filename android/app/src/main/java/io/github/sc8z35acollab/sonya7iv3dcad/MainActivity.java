package io.github.sc8z35acollab.sonya7iv3dcad;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.WebSettings;
import android.webkit.WebView;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

/**
 * Hardened Capacitor Android activity for 627-part Three.js WebGL 3D CAD viewer:
 * - Forces hardware layer & RENDERER_PRIORITY_IMPORTANT so Android/HyperOS preserves the WebGL GPU process.
 * - Routes multi-touch pinch gestures directly to Three.js OrbitControls (disables built-in WebView page zoom).
 * - Automatically recovers cleanly via activity recreate() if the OS ever kills the Chromium renderer process,
 *   preventing any permanent white-screen lockup.
 */
public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Crisp pure-white edge-to-edge chrome with dark status/nav icons
        getWindow().getDecorView().setBackgroundColor(Color.WHITE);
        getWindow().setStatusBarColor(Color.WHITE);
        getWindow().setNavigationBarColor(Color.WHITE);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
        WindowInsetsControllerCompat insetsController =
            WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (insetsController != null) {
            insetsController.setAppearanceLightStatusBars(true);
            insetsController.setAppearanceLightNavigationBars(true);
        }

        if (getBridge() != null && getBridge().getWebView() != null) {
            WebView webView = getBridge().getWebView();
            webView.setBackgroundColor(Color.WHITE);
            webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                webView.setRendererPriorityPolicy(WebView.RENDERER_PRIORITY_IMPORTANT, false);
            }

            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false);
            settings.setSupportZoom(false);
            settings.setCacheMode(WebSettings.LOAD_DEFAULT);

            // Auto-recover if HyperOS / Android LMKD ever terminates the Chromium GPU/renderer process
            webView.setWebViewClient(
                new BridgeWebViewClient(getBridge()) {
                    @Override
                    public boolean onRenderProcessGone(WebView view, RenderProcessGoneDetail detail) {
                        runOnUiThread(() -> {
                            if (!isFinishing() && !isDestroyed()) {
                                recreate();
                            }
                        });
                        return true;
                    }
                }
            );
        }
    }
}
