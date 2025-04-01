<?php

namespace Database\Factories;

use App\Models\BlockItem;
use App\Models\Block;
use Illuminate\Database\Eloquent\Factories\Factory;

class BlockItemFactory extends Factory
{
    protected $model = BlockItem::class;

    public function definition(): array
    {
        $types = array_keys(BlockItem::types());
        $type = $this->faker->randomElement($types);
        $buttonTypes = array_keys(BlockItem::buttonTypes());
        $imagePositions = array_keys(BlockItem::imagePositions());

        return [
            'block_id' => Block::factory(),
            'type' => $type,
            'name' => $this->faker->words(2, true),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraphs(3, true),
            'button_text' => $this->faker->randomElement([null, 'Xem thêm', 'Chi tiết', 'Mua ngay']),
            'button_url' => $this->faker->randomElement([null, '/', '/products', '/contact']),
            'button_type' => $this->faker->randomElement($buttonTypes),
            'image_position' => $this->faker->randomElement($imagePositions),
            'is_active' => $this->faker->boolean(80), // 80% chance of being active
            'sort_order' => $this->faker->numberBetween(0, 100),
            'settings' => null,
        ];
    }

    /**
     * Cấu hình factory cho loại tiêu đề
     */
    public function title()
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'title',
                'title' => $this->faker->sentence(),
                'description' => null,
                'content' => null,
                'button_text' => null,
                'button_url' => null,
            ];
        });
    }

    /**
     * Cấu hình factory cho loại mô tả
     */
    public function description()
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'description',
                'title' => null,
                'description' => $this->faker->paragraph(),
                'content' => null,
                'button_text' => null,
                'button_url' => null,
            ];
        });
    }

    /**
     * Cấu hình factory cho loại nội dung
     */
    public function content()
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'content',
                'title' => null,
                'description' => null,
                'content' => $this->faker->paragraphs(3, true),
                'button_text' => null,
                'button_url' => null,
            ];
        });
    }

    /**
     * Cấu hình factory cho loại hình ảnh
     */
    public function image()
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'image',
                'title' => null,
                'description' => null,
                'content' => null,
                'button_text' => null,
                'button_url' => null,
            ];
        });
    }

    /**
     * Cấu hình factory cho loại nút bấm
     */
    public function button()
    {
        $buttonTypes = array_keys(BlockItem::buttonTypes());
        
        return $this->state(function (array $attributes) use ($buttonTypes) {
            return [
                'type' => 'button',
                'title' => null,
                'description' => null,
                'content' => null,
                'button_text' => $this->faker->randomElement(['Xem thêm', 'Chi tiết', 'Mua ngay']),
                'button_url' => $this->faker->url,
                'button_type' => $this->faker->randomElement($buttonTypes),
            ];
        });
    }

    /**
     * Cấu hình factory cho loại tiêu đề + mô tả
     */
    public function titleDescription()
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'title_description',
                'title' => $this->faker->sentence(),
                'description' => $this->faker->paragraph(),
                'content' => null,
                'button_text' => null,
                'button_url' => null,
            ];
        });
    }

    /**
     * Cấu hình factory cho loại hình ảnh + nội dung
     */
    public function imageContent()
    {
        $imagePositions = ['left', 'right', 'top', 'bottom'];
        
        return $this->state(function (array $attributes) use ($imagePositions) {
            return [
                'type' => 'image_content',
                'title' => null,
                'description' => null,
                'content' => $this->faker->paragraphs(2, true),
                'button_text' => null,
                'button_url' => null,
                'image_position' => $this->faker->randomElement($imagePositions),
            ];
        });
    }

    /**
     * Cấu hình factory cho loại đầy đủ
     */
    public function full()
    {
        $buttonTypes = array_keys(BlockItem::buttonTypes());
        $imagePositions = array_keys(BlockItem::imagePositions());
        
        return $this->state(function (array $attributes) use ($buttonTypes, $imagePositions) {
            return [
                'type' => 'full',
                'title' => $this->faker->sentence(),
                'description' => $this->faker->paragraph(),
                'content' => $this->faker->paragraphs(3, true),
                'button_text' => $this->faker->randomElement(['Xem thêm', 'Chi tiết', 'Mua ngay']),
                'button_url' => $this->faker->url,
                'button_type' => $this->faker->randomElement($buttonTypes),
                'image_position' => $this->faker->randomElement($imagePositions),
            ];
        });
    }
}
