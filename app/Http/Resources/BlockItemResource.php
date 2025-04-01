<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BlockItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->content,
            'button_text' => $this->button_text,
            'button_url' => $this->button_url,
            'button_type' => $this->button_type,
            'image_position' => $this->image_position,
            'image_url' => $this->getFirstMediaUrl('block_image'),
            'image_thumb' => $this->getFirstMediaUrl('block_image', 'thumb'),
            'image_medium' => $this->getFirstMediaUrl('block_image', 'medium'),
            'sort_order' => $this->sort_order,
            'settings' => $this->settings,
        ];
    }
}
