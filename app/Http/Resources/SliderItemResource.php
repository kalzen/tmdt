<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SliderItemResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'button_text' => $this->button_text,
            'button_url' => $this->button_url,
            'sort_order' => $this->sort_order,
            'image_url' => $this->getFirstMediaUrl('slider_image'),
            'image_thumb' => $this->getFirstMediaUrl('slider_image', 'thumb'),
            'image_medium' => $this->getFirstMediaUrl('slider_image', 'medium'),
        ];
    }
}
