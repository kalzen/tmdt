<?php

namespace Database\Seeders;

use App\Models\Catalogue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Danh sách các danh mục cấp 0 (Root categories)
        $rootCategories = [
            [
                'name' => 'Điện thoại & Máy tính bảng',
                'description' => 'Các sản phẩm điện thoại, máy tính bảng và phụ kiện',
                'meta_title' => 'Điện thoại & Máy tính bảng chính hãng',
                'meta_description' => 'Mua sắm điện thoại và máy tính bảng chính hãng với giá tốt nhất',
                'position' => 1,
            ],
            [
                'name' => 'Máy tính & Laptop',
                'description' => 'Máy tính để bàn, laptop và các thiết bị ngoại vi',
                'meta_title' => 'Máy tính & Laptop chính hãng',
                'meta_description' => 'Mua sắm máy tính, laptop và phụ kiện với giá ưu đãi',
                'position' => 2,
            ],
            [
                'name' => 'Thiết bị điện tử',
                'description' => 'Các thiết bị điện tử, thiết bị thông minh',
                'meta_title' => 'Thiết bị điện tử chính hãng',
                'meta_description' => 'Mua sắm thiết bị điện tử chính hãng với giá tốt nhất',
                'position' => 3,
            ],
            [
                'name' => 'Điện gia dụng',
                'description' => 'Các thiết bị điện dùng trong gia đình',
                'meta_title' => 'Điện gia dụng chính hãng',
                'meta_description' => 'Mua sắm thiết bị điện gia dụng chính hãng với giá ưu đãi',
                'position' => 4,
            ],
            [
                'name' => 'Thời trang nam',
                'description' => 'Quần áo, giày dép và phụ kiện thời trang cho nam',
                'meta_title' => 'Thời trang nam chính hãng',
                'meta_description' => 'Mua sắm thời trang nam chính hãng với giá tốt nhất',
                'position' => 5,
            ],
            [
                'name' => 'Thời trang nữ',
                'description' => 'Quần áo, giày dép và phụ kiện thời trang cho nữ',
                'meta_title' => 'Thời trang nữ chính hãng',
                'meta_description' => 'Mua sắm thời trang nữ chính hãng với giá ưu đãi',
                'position' => 6,
            ],
            [
                'name' => 'Sắc đẹp',
                'description' => 'Mỹ phẩm và các sản phẩm chăm sóc sắc đẹp',
                'meta_title' => 'Mỹ phẩm & Làm đẹp chính hãng',
                'meta_description' => 'Mua sắm mỹ phẩm và sản phẩm làm đẹp chính hãng',
                'position' => 7,
            ],
            [
                'name' => 'Sức khỏe',
                'description' => 'Thực phẩm chức năng và sản phẩm chăm sóc sức khỏe',
                'meta_title' => 'Sản phẩm sức khỏe chính hãng',
                'meta_description' => 'Mua sắm sản phẩm chăm sóc sức khỏe chính hãng',
                'position' => 8,
            ],
            [
                'name' => 'Nhà cửa & Đời sống',
                'description' => 'Đồ dùng gia đình, nội thất và trang trí',
                'meta_title' => 'Đồ dùng nhà cửa & Đời sống',
                'meta_description' => 'Mua sắm đồ dùng nhà cửa và đời sống với giá tốt nhất',
                'position' => 9,
            ],
            [
                'name' => 'Thể thao & Du lịch',
                'description' => 'Dụng cụ thể thao và đồ dùng du lịch',
                'meta_title' => 'Thể thao & Du lịch chính hãng',
                'meta_description' => 'Mua sắm dụng cụ thể thao và đồ dùng du lịch chính hãng',
                'position' => 10,
            ],
        ];

        // Tạo các danh mục cấp 0 và lưu vào mảng để tạo danh mục con
        $createdRootCategories = [];
        foreach ($rootCategories as $category) {
            $slug = Str::slug($category['name']);
            $createdCategory = Catalogue::create([
                'name' => $category['name'],
                'slug' => $slug,
                'description' => $category['description'],
                'meta_title' => $category['meta_title'],
                'meta_description' => $category['meta_description'],
                'level' => 0, // Cấp 0
                'position' => $category['position'],
                'is_active' => true,
            ]);
            
            $createdRootCategories[$slug] = $createdCategory;
        }

        // Danh mục cấp 1 cho Điện thoại & Máy tính bảng
        $this->createSubcategories($createdRootCategories['dien-thoai-may-tinh-bang'], [
            [
                'name' => 'Điện thoại di động',
                'description' => 'Các loại điện thoại di động từ nhiều thương hiệu',
                'children' => [
                    'iPhone',
                    'Samsung',
                    'Xiaomi',
                    'OPPO',
                    'Vivo',
                    'Realme',
                    'Nokia',
                    'Điện thoại phổ thông',
                ]
            ],
            [
                'name' => 'Máy tính bảng',
                'description' => 'Máy tính bảng các loại',
                'children' => [
                    'iPad',
                    'Samsung Galaxy Tab',
                    'Xiaomi Pad',
                    'Lenovo Tab',
                    'Máy tính bảng giá rẻ',
                ]
            ],
            [
                'name' => 'Phụ kiện điện thoại',
                'description' => 'Phụ kiện cho điện thoại di động',
                'children' => [
                    'Ốp lưng & Bao da',
                    'Miếng dán màn hình',
                    'Cáp & Củ sạc',
                    'Pin dự phòng',
                    'Giá đỡ điện thoại',
                    'Túi chống nước',
                ]
            ],
            [
                'name' => 'Phụ kiện máy tính bảng',
                'description' => 'Phụ kiện cho máy tính bảng',
                'children' => [
                    'Bao da & Ốp lưng',
                    'Bàn phím',
                    'Bút cảm ứng',
                    'Đế đỡ & Giá đỡ',
                ]
            ],
        ]);

        // Danh mục cấp 1 cho Máy tính & Laptop
        $this->createSubcategories($createdRootCategories['may-tinh-laptop'], [
            [
                'name' => 'Laptop',
                'description' => 'Máy tính xách tay các loại',
                'children' => [
                    'Laptop Gaming',
                    'Laptop Văn phòng',
                    'Laptop Đồ họa',
                    'MacBook',
                    'Ultrabook',
                ]
            ],
            [
                'name' => 'Máy tính để bàn',
                'description' => 'Máy tính để bàn và linh kiện',
                'children' => [
                    'PC Gaming',
                    'PC Văn phòng',
                    'PC Đồ họa',
                    'PC All-in-one',
                ]
            ],
            [
                'name' => 'Linh kiện máy tính',
                'description' => 'Linh kiện và phụ kiện máy tính',
                'children' => [
                    'CPU',
                    'Mainboard',
                    'RAM',
                    'Ổ cứng',
                    'Card màn hình',
                    'Nguồn máy tính',
                    'Tản nhiệt',
                    'Case máy tính',
                ]
            ],
            [
                'name' => 'Màn hình',
                'description' => 'Màn hình máy tính các loại',
                'children' => [
                    'Màn hình Gaming',
                    'Màn hình Đồ họa',
                    'Màn hình Văn phòng',
                    'Màn hình Cong',
                ]
            ],
            [
                'name' => 'Thiết bị mạng',
                'description' => 'Thiết bị mạng các loại',
                'children' => [
                    'Router',
                    'Switch',
                    'Bộ kích sóng',
                    'Bộ phát Wifi',
                    'Card mạng',
                ]
            ],
        ]);

        // Danh mục cấp 1 cho Thiết bị điện tử
        $this->createSubcategories($createdRootCategories['thiet-bi-dien-tu'], [
            [
                'name' => 'Tivi & Màn hình',
                'description' => 'Tivi và màn hình lớn',
                'children' => [
                    'Smart TV',
                    'Android TV',
                    'Tivi 4K',
                    'Tivi 8K',
                    'Tivi QLED',
                    'Tivi OLED',
                ]
            ],
            [
                'name' => 'Âm thanh',
                'description' => 'Thiết bị âm thanh và giải trí',
                'children' => [
                    'Loa Bluetooth',
                    'Loa thanh',
                    'Tai nghe',
                    'Micro',
                    'Amply',
                ]
            ],
            [
                'name' => 'Máy ảnh & Máy quay',
                'description' => 'Thiết bị chụp hình và quay phim',
                'children' => [
                    'Máy ảnh DSLR',
                    'Máy ảnh Mirrorless',
                    'Máy ảnh Compact',
                    'Camera hành trình',
                    'Camera an ninh',
                    'Phụ kiện máy ảnh',
                ]
            ],
            [
                'name' => 'Thiết bị thông minh',
                'description' => 'Các thiết bị điện tử thông minh',
                'children' => [
                    'Đồng hồ thông minh',
                    'Vòng đeo tay thông minh',
                    'Thiết bị đeo',
                    'Nhà thông minh',
                    'Thiết bị điều khiển',
                ]
            ],
        ]);

        // Danh mục cấp 1 cho Điện gia dụng
        $this->createSubcategories($createdRootCategories['dien-gia-dung'], [
            [
                'name' => 'Đồ dùng nhà bếp',
                'description' => 'Thiết bị điện dùng trong nhà bếp',
                'children' => [
                    'Nồi cơm điện',
                    'Bếp điện',
                    'Lò vi sóng',
                    'Lò nướng',
                    'Máy xay sinh tố',
                    'Máy ép trái cây',
                    'Máy làm bánh',
                    'Ấm đun nước',
                ]
            ],
            [
                'name' => 'Thiết bị gia đình',
                'description' => 'Thiết bị điện dùng trong gia đình',
                'children' => [
                    'Máy giặt',
                    'Máy sấy',
                    'Tủ lạnh',
                    'Tủ đông',
                    'Máy rửa chén',
                    'Máy hút bụi',
                    'Quạt điện',
                ]
            ],
            [
                'name' => 'Điều hòa & Sưởi ấm',
                'description' => 'Thiết bị điều hòa nhiệt độ',
                'children' => [
                    'Máy điều hòa',
                    'Máy sưởi',
                    'Máy phun sương',
                    'Máy tạo ẩm',
                    'Máy hút ẩm',
                ]
            ],
            [
                'name' => 'Chăm sóc cá nhân',
                'description' => 'Thiết bị chăm sóc cá nhân',
                'children' => [
                    'Máy sấy tóc',
                    'Máy cạo râu',
                    'Máy tạo kiểu tóc',
                    'Máy rửa mặt',
                    'Máy massage',
                ]
            ],
        ]);

        // Danh mục cấp 1 cho Thời trang nam
        $this->createSubcategories($createdRootCategories['thoi-trang-nam'], [
            [
                'name' => 'Quần áo nam',
                'description' => 'Quần áo dành cho nam giới',
                'children' => [
                    'Áo thun',
                    'Áo sơ mi',
                    'Áo khoác',
                    'Quần jeans',
                    'Quần kaki',
                    'Quần short',
                    'Đồ lót',
                    'Đồ thể thao',
                ]
            ],
            [
                'name' => 'Giày dép nam',
                'description' => 'Giày dép dành cho nam giới',
                'children' => [
                    'Giày thể thao',
                    'Giày tây',
                    'Giày lười',
                    'Dép & Sandal',
                    'Giày đá bóng',
                ]
            ],
            [
                'name' => 'Phụ kiện thời trang nam',
                'description' => 'Phụ kiện thời trang cho nam giới',
                'children' => [
                    'Đồng hồ',
                    'Ví',
                    'Thắt lưng',
                    'Mũ & Nón',
                    'Kính mát',
                    'Cà vạt & Nơ',
                    'Trang sức nam',
                ]
            ],
            [
                'name' => 'Túi xách nam',
                'description' => 'Túi xách dành cho nam giới',
                'children' => [
                    'Túi đeo chéo',
                    'Túi xách tay',
                    'Balo',
                    'Túi laptop',
                    'Vali & Túi du lịch',
                ]
            ],
        ]);

        // Danh mục cấp 1 cho Thời trang nữ
        $this->createSubcategories($createdRootCategories['thoi-trang-nu'], [
            [
                'name' => 'Quần áo nữ',
                'description' => 'Quần áo dành cho nữ giới',
                'children' => [
                    'Áo thun & Áo phông',
                    'Áo sơ mi',
                    'Áo khoác',
                    'Váy đầm',
                    'Quần jeans',
                    'Quần dài',
                    'Quần short',
                    'Đồ lót',
                    'Đồ ngủ',
                    'Đồ thể thao',
                ]
            ],
            [
                'name' => 'Giày dép nữ',
                'description' => 'Giày dép dành cho nữ giới',
                'children' => [
                    'Giày cao gót',
                    'Giày đế bằng',
                    'Giày thể thao',
                    'Giày búp bê',
                    'Dép & Sandal',
                    'Boots',
                ]
            ],
            [
                'name' => 'Phụ kiện thời trang nữ',
                'description' => 'Phụ kiện thời trang cho nữ giới',
                'children' => [
                    'Đồng hồ',
                    'Trang sức',
                    'Kính mát',
                    'Mũ & Nón',
                    'Khăn quàng cổ',
                    'Găng tay',
                    'Phụ kiện tóc',
                ]
            ],
            [
                'name' => 'Túi xách nữ',
                'description' => 'Túi xách dành cho nữ giới',
                'children' => [
                    'Túi xách tay',
                    'Túi đeo chéo',
                    'Túi tote',
                    'Balo nữ',
                    'Ví cầm tay',
                    'Túi du lịch',
                ]
            ],
        ]);

        // Tương tự cho các danh mục khác: Sắc đẹp, Sức khỏe, Nhà cửa, Thể thao
        // Tạo danh mục cấp 1 cho Sắc đẹp
        $this->createSubcategories($createdRootCategories['sac-dep'], [
            [
                'name' => 'Chăm sóc da mặt',
                'description' => 'Sản phẩm chăm sóc da mặt',
                'children' => [
                    'Sữa rửa mặt',
                    'Toner',
                    'Serum',
                    'Kem dưỡng',
                    'Mặt nạ',
                    'Tẩy trang',
                    'Chống nắng',
                ]
            ],
            [
                'name' => 'Trang điểm',
                'description' => 'Sản phẩm trang điểm',
                'children' => [
                    'Kem nền & Cushion',
                    'Phấn phủ',
                    'Son môi',
                    'Mascara',
                    'Phấn mắt',
                    'Kẻ mắt',
                    'Che khuyết điểm',
                ]
            ],
            [
                'name' => 'Chăm sóc cơ thể',
                'description' => 'Sản phẩm chăm sóc cơ thể',
                'children' => [
                    'Sữa tắm',
                    'Kem dưỡng thể',
                    'Tẩy tế bào chết',
                    'Xịt thơm',
                    'Sản phẩm khử mùi',
                ]
            ],
            [
                'name' => 'Chăm sóc tóc',
                'description' => 'Sản phẩm chăm sóc tóc',
                'children' => [
                    'Dầu gội',
                    'Dầu xả',
                    'Kem ủ tóc',
                    'Serum dưỡng tóc',
                    'Thuốc nhuộm tóc',
                ]
            ],
        ]);

        // Tạo danh mục cấp 1 cho Sức khỏe
        $this->createSubcategories($createdRootCategories['suc-khoe'], [
            [
                'name' => 'Thực phẩm chức năng',
                'description' => 'Thực phẩm bổ sung',
                'children' => [
                    'Vitamin & Khoáng chất',
                    'Hỗ trợ tim mạch',
                    'Hỗ trợ xương khớp',
                    'Tăng cường miễn dịch',
                    'Hỗ trợ tiêu hóa',
                ]
            ],
            [
                'name' => 'Dụng cụ y tế',
                'description' => 'Thiết bị và dụng cụ y tế',
                'children' => [
                    'Máy đo huyết áp',
                    'Máy đo đường huyết',
                    'Nhiệt kế',
                    'Băng gạc & Băng keo',
                    'Khẩu trang y tế',
                ]
            ],
            [
                'name' => 'Chăm sóc cá nhân',
                'description' => 'Sản phẩm vệ sinh cá nhân',
                'children' => [
                    'Bàn chải & Kem đánh răng',
                    'Sản phẩm vệ sinh phụ nữ',
                    'Băng vệ sinh',
                    'Giấy vệ sinh',
                    'Tã người lớn',
                ]
            ],
            [
                'name' => 'Thể thao & Fitness',
                'description' => 'Sản phẩm hỗ trợ thể thao',
                'children' => [
                    'Protein & Sữa tăng cơ',
                    'Đai và băng hỗ trợ',
                    'Thực phẩm Eat Clean',
                    'Thực phẩm Keto',
                ]
            ],
        ]);

        // Tạo danh mục cấp 1 cho Nhà cửa & Đời sống
        $this->createSubcategories($createdRootCategories['nha-cua-doi-song'], [
            [
                'name' => 'Nội thất',
                'description' => 'Nội thất và đồ trang trí',
                'children' => [
                    'Bàn & Ghế',
                    'Giường & Nệm',
                    'Tủ & Kệ',
                    'Sofa & Đồ ngồi',
                    'Đèn trang trí',
                    'Tranh & Khung ảnh',
                ]
            ],
            [
                'name' => 'Đồ dùng nhà bếp',
                'description' => 'Vật dụng nhà bếp',
                'children' => [
                    'Nồi & Chảo',
                    'Dao, Thớt & Dụng cụ',
                    'Đồ dùng bàn ăn',
                    'Hộp đựng thực phẩm',
                    'Đồ dùng uống trà, cà phê',
                ]
            ],
            [
                'name' => 'Đồ dùng phòng tắm',
                'description' => 'Vật dụng phòng tắm',
                'children' => [
                    'Khăn tắm & Khăn mặt',
                    'Vòi sen & Phụ kiện',
                    'Kệ & Giá để đồ',
                    'Rèm phòng tắm',
                    'Thảm chùi chân',
                ]
            ],
            [
                'name' => 'Đồ dùng phòng ngủ',
                'description' => 'Vật dụng phòng ngủ',
                'children' => [
                    'Chăn, ga, gối, nệm',
                    'Rèm cửa',
                    'Đèn ngủ',
                    'Thảm trải sàn',
                ]
            ],
        ]);

        // Tạo danh mục cấp 1 cho Thể thao & Du lịch
        $this->createSubcategories($createdRootCategories['the-thao-du-lich'], [
            [
                'name' => 'Dụng cụ thể thao',
                'description' => 'Dụng cụ tập luyện thể thao',
                'children' => [
                    'Dụng cụ tập Gym',
                    'Yoga & Pilates',
                    'Bóng đá',
                    'Bóng rổ',
                    'Tennis & Cầu lông',
                    'Bơi lội',
                ]
            ],
            [
                'name' => 'Thời trang thể thao',
                'description' => 'Trang phục thể thao',
                'children' => [
                    'Áo thể thao',
                    'Quần thể thao',
                    'Đồ bơi',
                    'Giày thể thao',
                    'Tất thể thao',
                ]
            ],
            [
                'name' => 'Đồ dùng du lịch',
                'description' => 'Vật dụng phục vụ du lịch',
                'children' => [
                    'Vali & Túi du lịch',
                    'Balo & Túi đeo chéo',
                    'Phụ kiện du lịch',
                    'Lều & Đồ cắm trại',
                    'Đồ dùng dã ngoại',
                ]
            ],
            [
                'name' => 'Xe đạp & Phụ kiện',
                'description' => 'Xe đạp và phụ kiện đi kèm',
                'children' => [
                    'Xe đạp',
                    'Mũ bảo hiểm',
                    'Phụ kiện xe đạp',
                    'Phụ tùng thay thế',
                    'Đồ bảo hộ',
                ]
            ],
        ]);
    }

    /**
     * Tạo danh mục con (cấp 1) và cháu (cấp 2)
     */
    private function createSubcategories($parentCategory, $subcategories, $level = 1): void
    {
        $position = 1;
        foreach ($subcategories as $subcategory) {
            $slug = Str::slug($subcategory['name']);
            $newCategory = Catalogue::create([
                'name' => $subcategory['name'],
                'slug' => $slug,
                'description' => $subcategory['description'],
                'parent_id' => $parentCategory->id,
                'level' => $level,
                'position' => $position,
                'is_active' => true,
                'meta_title' => $subcategory['name'] . ' chính hãng, giá tốt',
                'meta_description' => 'Mua sắm ' . $subcategory['name'] . ' chính hãng với giá tốt nhất',
            ]);
            
            $position++;
            
            // Tạo danh mục cấp 2 nếu có
            if (isset($subcategory['children']) && is_array($subcategory['children'])) {
                $childPosition = 1;
                foreach ($subcategory['children'] as $childName) {
                    $childSlug = Str::slug($childName);
                    Catalogue::create([
                        'name' => $childName,
                        'slug' => $childSlug,
                        'description' => 'Danh mục ' . $childName,
                        'parent_id' => $newCategory->id,
                        'level' => $level + 1,
                        'position' => $childPosition,
                        'is_active' => true,
                        'meta_title' => $childName . ' chính hãng, giá tốt',
                        'meta_description' => 'Mua sắm ' . $childName . ' chính hãng với giá tốt nhất',
                    ]);
                    
                    $childPosition++;
                }
            }
        }
    }
}
