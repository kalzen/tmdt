<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SetupDemoAssets extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'setup:demo-assets';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set up demo assets for automatic store creation';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Setting up demo assets...');
        
        // Create assets directory if it doesn't exist
        $assetsDir = public_path('assets/images');
        
        if (!File::isDirectory($assetsDir)) {
            File::makeDirectory($assetsDir, 0755, true);
            $this->info('Created assets directory: ' . $assetsDir);
        }
        
        // Create placeholder images if they don't exist
        $this->createPlaceholderImage($assetsDir . '/demo-store-logo.png', 400, 400, 'Store Logo');
        $this->createPlaceholderImage($assetsDir . '/demo-store-banner.jpg', 1200, 300, 'Store Banner');
        
        for ($i = 1; $i <= 5; $i++) {
            $this->createPlaceholderImage(
                $assetsDir . "/demo-product-{$i}.jpg", 
                800, 
                800, 
                "Product {$i}"
            );
        }
        
        $this->info('Demo assets setup completed successfully!');
        
        return Command::SUCCESS;
    }
    
    /**
     * Create a placeholder image with text
     *
     * @param string $path
     * @param int $width
     * @param int $height
     * @param string $text
     * @return void
     */
    private function createPlaceholderImage($path, $width, $height, $text)
    {
        if (File::exists($path)) {
            $this->line("Image already exists: " . basename($path));
            return;
        }
        
        // Create a blank image
        $image = imagecreatetruecolor($width, $height);
        
        // Set colors
        $bgColor = imagecolorallocate($image, rand(200, 240), rand(200, 240), rand(200, 240));
        $textColor = imagecolorallocate($image, 50, 50, 50);
        
        // Fill the background
        imagefill($image, 0, 0, $bgColor);
        
        // Add text
        $fontSize = 5;
        $textWidth = imagefontwidth($fontSize) * strlen($text);
        $textHeight = imagefontheight($fontSize);
        
        // Center the text
        $centerX = ceil(($width - $textWidth) / 2);
        $centerY = ceil(($height - $textHeight) / 2);
        
        imagestring($image, $fontSize, $centerX, $centerY, $text, $textColor);
        
        // Save the image
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        
        if ($extension === 'jpg' || $extension === 'jpeg') {
            imagejpeg($image, $path, 90);
        } elseif ($extension === 'png') {
            imagepng($image, $path, 9);
        }
        
        // Free memory
        imagedestroy($image);
        
        $this->info("Created image: " . basename($path));
    }
}
