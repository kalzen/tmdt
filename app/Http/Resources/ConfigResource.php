<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ConfigResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $value = $this->value;
        
        if ($this->type === 'image') {
            $value = [
                'logo' => $this->getFirstMediaUrl('logo'),
                'favicon' => $this->getFirstMediaUrl('favicon'),
                'thumbnail' => $this->getFirstMediaUrl('thumbnail'),
            ];
        } elseif ($this->type === 'boolean') {
            $value = (bool) $this->value;
        } elseif ($this->type === 'number') {
            $value = (float) $this->value;
        }
        
        return [
            'name' => $this->name,
            'title' => $this->title,
            'value' => $value,
            'type' => $this->type,
            'group' => $this->group,
            'description' => $this->description,
        ];
    }
}
