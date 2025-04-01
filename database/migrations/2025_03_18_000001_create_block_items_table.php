<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlockItemsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('block_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('block_id')->constrained()->onDelete('cascade');
            $table->string('type'); // Loại item: title, description, content, image, button
            $table->string('name')->nullable(); // Tên hiển thị
            $table->string('title')->nullable(); // Tiêu đề
            $table->text('description')->nullable(); // Mô tả ngắn
            $table->longText('content')->nullable(); // Nội dung chi tiết
            $table->string('button_text')->nullable(); // Văn bản nút bấm
            $table->string('button_url')->nullable(); // URL nút bấm
            $table->string('button_type')->default('primary'); // Loại nút: primary, secondary, outline...
            $table->string('image_position')->default('left'); // Vị trí ảnh: left, right, top, bottom, background
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0); // Thứ tự trong block
            $table->json('settings')->nullable(); // Cài đặt bổ sung dạng JSON
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('block_items');
    }
}
