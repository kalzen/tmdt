<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'ip_address',
        'status'
    ];

    /**
     * Status options for contact messages
     */
    public static function statusOptions()
    {
        return [
            'new' => 'Mới',
            'in_progress' => 'Đang xử lý',
            'completed' => 'Đã xử lý',
            'spam' => 'Spam'
        ];
    }
}
