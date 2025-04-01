<?php

/**
 * Simple API Testing Script
 * This script helps test API endpoints directly from the browser
 */

$baseUrl = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https://' : 'http://';
$baseUrl .= $_SERVER['HTTP_HOST'];

// Add some test routes
$routes = [
    'API Ping' => '/api/ping',
    'API Routes List' => '/api/routes',
    'Posts List' => '/api/v1/posts',
    'Categories List' => '/api/v1/categories',
    'Blocks List' => '/api/v1/blocks',
    'Configs List' => '/api/v1/configs',
    'Members List' => '/api/v1/members',
];

// Test a specific route if requested
if (isset($_GET['test'])) {
    $route = $_GET['test'];
    $url = $baseUrl . $route;
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    header('Content-Type: application/json');
    echo json_encode([
        'route' => $route,
        'url' => $url,
        'status' => $status,
        'response' => json_decode($response, true)
    ], JSON_PRETTY_PRINT);
    exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Route Tester</title>
    <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #333; }
        .route { margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        .route-name { font-weight: bold; margin-bottom: 5px; }
        .route-url { font-family: monospace; margin-bottom: 10px; color: #666; }
        .btn { padding: 5px 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; }
        .response { margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 4px; display: none; }
        pre { white-space: pre-wrap; margin: 0; }
    </style>
</head>
<body>
    <h1>API Route Tester</h1>
    <div class="routes">
        <?php foreach ($routes as $name => $route): ?>
        <div class="route">
            <div class="route-name"><?= htmlspecialchars($name) ?></div>
            <div class="route-url"><?= htmlspecialchars($route) ?></div>
            <button class="btn" data-route="<?= htmlspecialchars($route) ?>">Test</button>
            <div class="response"></div>
        </div>
        <?php endforeach; ?>
    </div>
    
    <script>
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function() {
                const route = this.getAttribute('data-route');
                const responseEl = this.nextElementSibling;
                
                responseEl.innerHTML = 'Loading...';
                responseEl.style.display = 'block';
                
                fetch(`?test=${encodeURIComponent(route)}`)
                    .then(response => response.json())
                    .then(data => {
                        responseEl.innerHTML = `
                            <p>Status: ${data.status}</p>
                            <pre>${JSON.stringify(data.response, null, 2)}</pre>
                        `;
                    })
                    .catch(error => {
                        responseEl.innerHTML = `<p>Error: ${error.message}</p>`;
                    });
            });
        });
    </script>
</body>
</html>
