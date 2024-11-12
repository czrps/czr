<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stok Yönetim Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Montserrat', sans-serif;
            background: linear-gradient(135deg, #f3f4f6, #ffffff);
            margin: 0;
            padding: 0;
            color: #333;
            transition: background 0.3s, color 0.3s;
        }
        .navbar {
            background: linear-gradient(90deg, #3b5998, #2d4373);
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .welcome {
            text-align: center;
            padding: 15px;
            font-size: 18px;
            color: #555;
        }
        .search-bar {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        .search-bar input {
            width: 300px;
            padding: 10px;
            border: 2px solid #3b5998;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
        }
        .container {
            width: 90%;
            max-width: 1200px;
            margin: 20px auto;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        .card {
            background-color: white;
            border-radius: 15px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            margin: 15px;
            padding: 20px;
            text-align: center;
            width: 220px;
            transition: transform 0.4s, box-shadow 0.4s, background-color 0.3s;
            color: #3b5998;
            position: relative;
            overflow: hidden;
            cursor: pointer;
        }
        .card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
            background-color: #edf2fa;
        }
        .card i {
            font-size: 50px;
            margin-bottom: 15px;
            color: #3b5998;
            transition: transform 0.3s, color 0.4s;
        }
        .card:hover i {
            transform: rotate(10deg);
            color: #2d4373;
        }
        .card a {
            text-decoration: none;
            color: #3b5998;
            font-weight: 600;
            font-size: 18px;
            display: block;
            margin-top: 12px;
            transition: color 0.3s;
        }
        .card a:hover {
            color: #2d4373;
        }
        .stats-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
            margin: 20px 0;
        }
        .stat-card {
            background-color: #3b5998;
            color: white;
            border-radius: 10px;
            padding: 15px;
            width: 160px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
        .stat-card h3 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .stat-card p {
            margin: 5px 0 0;
            font-size: 14px;
            color: #edf2fa;
        }
        .dark-mode-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3b5998;
            color: white;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
        }
        .dark-mode {
            background: #1c1c1c;
            color: #d3d3d3;
        }
        .dark-mode .navbar,
        .dark-mode .footer {
            background: #333;
        }
        .dark-mode .card {
            background-color: #2e2e2e;
            color: #d3d3d3;
        }
        .dark-mode .stat-card {
            background-color: #444;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            max-width: 400px;
            width: 100%;
        }
        .close-button {
            background: #3b5998;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
        .footer {
            background: #3b5998;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            margin-top: 30px;
            box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
        }
        .dark-mode .footer {
            background: #2e2e2e;
            color: #d3d3d3;
        }
    @media (max-width: 768px) {
    .card {
        width: 100%;
        margin: 10px 0;
    }
    .stat-card {
        width: 100%;
        margin: 10px 0;
    }
    .dark-mode-toggle {
        top: 10px;
        right: 10px;
        padding: 8px;
        font-size: 14px;
    }
}
</style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const applyFiltersButton = document.querySelector('#applyFilters');
            const stockStatusTable = document.querySelector('#stockStatusTable');
            const searchProductCode = document.querySelector('#searchProductCode');
            const stockStatusFilter = document.querySelector('#stockStatusFilter');
            const categoryFilter = document.querySelector('#categoryFilter');

            applyFiltersButton.addEventListener('click', function() {
                const productCode = searchProductCode.value.toLowerCase();
                const stockStatus = stockStatusFilter.value;
                const category = categoryFilter.value;

                const rows = stockStatusTable.querySelectorAll('tr');
                rows.forEach(row => {
                    const productName = row.children[0].textContent.toLowerCase();
                    const stockAmount = parseInt(row.children[1].textContent);
                    const criticalLevel = parseInt(row.children[2].textContent);
                    const rowCategory = row.dataset.category ? row.dataset.category.trim().toLowerCase() : '';
                    let display = true;

                    if (productCode && !productName.includes(productCode)) {
                        display = false;
                    }

                    if (stockStatus === 'yeterli' && stockAmount < criticalLevel) {
                        display = false;
                    } else if (stockStatus === 'yetersiz' && stockAmount >= criticalLevel) {
                        display = false;
                    }

                    if (category && rowCategory !== category.trim().toLowerCase()) {
                        display = false;
                    }

                    row.style.display = display ? '' : 'none';
                });
            });
            const sellProductButton = document.querySelector('#sellProductButton');
            const sellModal = document.querySelector('#sellModal');
            const closeSellModalButton = document.querySelector('#closeSellModal');
            const sellForm = document.querySelector('#sellForm');

            // Satış Modal setup
            sellProductButton.addEventListener('click', function() {
                sellModal.style.display = 'flex';
            });

            closeSellModalButton.addEventListener('click', function() {
                // Modal kapatma ekleme
                sellModal.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === sellModal) {
                    sellModal.style.display = 'none';
                }
            });

            // Satış Form submission
            sellForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(sellForm);
                const requestOptions = {
                    method: 'POST',
                    body: formData
                };

                // Modal kapatma ekleme
                sellModal.style.display = 'none';

                fetch('satis_ekle.php', requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        alert('Satış başarıyla gerçekleştirildi!');
                    })
                    .catch(error => {
                        alert('Satış sırasında bir hata oluştu.');
                    });
            });
            const darkModeToggle = document.querySelector('.dark-mode-toggle');
            function toggleDarkMode() {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('dark-mode', 'enabled');
                } else {
                    localStorage.setItem('dark-mode', 'disabled');
                }
            }
            const modal = document.querySelector('.modal');
            const closeModalButton = document.querySelector('#closeModal');
            const addProductButton = document.querySelector('#addProductButton');
            const productForm = document.querySelector('#productForm');

            // Dark mode setup
            if (localStorage.getItem('dark-mode') === 'enabled') {
                document.body.classList.add('dark-mode');
            }

            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('dark-mode', 'enabled');
                } else {
                    localStorage.setItem('dark-mode', 'disabled');
                }
            });

            // Modal setup
            addProductButton.addEventListener('click', function() {
                modal.style.display = 'flex';
            });

            closeModalButton.addEventListener('click', function() {
                modal.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
                if (event.target === sellModal) {
                    sellModal.style.display = 'none';
                }
            });

            // Form submission
            productForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(productForm);
                const requestOptions = {
                    method: 'POST',
                    body: formData
                };

                // Modal kapatma ekleme
                modal.style.display = 'none';

                fetch('ekle.php', requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        alert('Ürün başarıyla eklendi!');
                    })
                    .catch(error => {
                        alert('Ürün eklenirken bir hata oluştu.');
                    });
            });
        });
    </script>
<script>
        document.addEventListener('DOMContentLoaded', function() {
            function updateStats() {
    fetch('get_stats.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('toplamUrun').textContent = data.toplam_urun;
            document.getElementById('stokDusuk').textContent = data.stok_dusuk;
            document.getElementById('toplamSatis').textContent = data.toplam_satis;
        })
        .catch(error => {
            console.error('Veri güncellenirken hata oluştu:', error);
        });
}

// Her 5 saniyede bir güncelleme
setInterval(updateStats, 5000);
updateStats(); // İlk başlatma);
    </script>
<script>
        document.addEventListener('DOMContentLoaded', function() {
            function updateStats() {
                fetch('get_stats.php')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('toplamUrun').textContent = data.toplam_urun;
                        document.getElementById('stokDusuk').textContent = data.stok_dusuk;
                        document.getElementById('toplamSatis').textContent = data.toplam_satis;
                    })
                    .catch(error => {
                        console.error('Veri güncellenirken hata oluştu:', error);
                    });
            }

            // Her 5 saniyede bir güncelleme
            setInterval(updateStats, 5000);
            updateStats(); // İlk başlatma
        });
    </script>
</head>
<body>

    <div class="navbar">Stok Yönetim Dashboard</div>
    <div class="dark-mode-toggle" onclick="toggleDarkMode()">🌙 Karanlık Mod</div>
    <div class="welcome">Hoş Geldiniz, <span id="userName"></span></div>

    <div class="search-bar">
        <input type="text" placeholder="Ürün Ara...">
    </div>

    <div class="stats-container">
        <div class="stat-card">
            <?php
                    include 'bağlantı.php';
                    $sql = "SELECT COUNT(*) as toplam_urun FROM ürünler";
                    $result = $conn->query($sql);
                    if ($result && $result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $toplam_urun = $row['toplam_urun'];
                    } else {
                        echo "<p>Toplam Ürün bilgisi alınırken bir hata oluştu: " . $conn->error . "</p>";
                        $toplam_urun = 0;
                    }
                    ?>
                    <h3 id="toplamUrun"><?php echo $toplam_urun; ?></h3>
                    <p>Toplam Ürün</p>
        </div>
        <div class="stat-card">
            <?php
                    $sql = "SELECT COUNT(*) as stok_dusuk FROM ürünler WHERE stok_adedi < kritik_seviye";
                    $result = $conn->query($sql);
                    if ($result && $result->num_rows > 0) {
                        $row = $result->fetch_assoc();
                        $stok_dusuk = $row['stok_dusuk'];
                    } else {
                        echo "<p>Stok Düşük bilgisi alınırken bir hata oluştu: " . $conn->error . "</p>";
                        $stok_dusuk = 0;
                    }
                    ?>
                    <h3 id="stokDusuk"><?php echo $stok_dusuk; ?></h3>
                    <p>Stok Düşük</p>
        </div>
        <div class="stat-card">
            <h3 id="toplamSatis">0</h3>
<p>Satışlar</p>
        </div>
    </div>

    <div class="container">
        <div class="card sell-product-button" id="sellProductButton">
            <i class="fas fa-shopping-cart"></i>
            <a href="#">Ürün Sat</a>
        </div>
        <div class="card" id="addProductButton">
            <i class="fas fa-plus"></i>
            <a href="#">Ürün Ekle</a>
        </div>
        <div class="card">
            <i class="fas fa-list"></i>
            <a href="listele.php">Ürünleri Listele</a>
        </div>
        <div class="card">
            <i class="fas fa-edit"></i>
            <a href="güncelle.php">Stok Güncelle</a>
        </div>
        <div class="card">
            <i class="fas fa-trash"></i>
            <a href="sil.php">Ürünü Sil</a>
        </div>
        <div class="card">
            <i class="fas fa-box"></i>
            <a href="#">Stok Durumu</a>
        </div>
        <div class="card">
            <i class="fas fa-chart-bar"></i>
            <a href="raporlar.php">Raporlar</a>
        </div>
        <div class="card">
            <i class="fas fa-cogs"></i>
            <a href="ayarlar.php">Ayarlar</a>
        </div>
    </div>

    <!-- Modal for Adding Product -->
    <div class="modal">
        <div class="modal-content" style="box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); border-radius: 10px; padding: 20px; max-width: 450px;">
            <h3 style="color: #3b5998; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Ürün Sat</h3>
            <form id="productForm">
                <input type="text" name="urun_adi" placeholder="Ürün Adı" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px;" required><br>
                <select name="kategori" style="margin-bottom: 15px; padding: 10px; width: 85%; border-radius: 12px; border: 1.5px solid #3b5998; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 14px; background-color: #ffffff; cursor: pointer;" required>
                    <option value="">Kategori Seçin</option>
                    <?php
                    include 'bağlantı.php';
                    $sql = "SELECT kategori_adi FROM kategori";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            echo "<option value='" . $row['kategori_adi'] . "'>" . $row['kategori_adi'] . "</option>";
                        }
                    } else {
                        echo "<option value=''>Kategori bulunamadı</option>";
                    }
                    ?>
                </select><br>
                <input type="number" step="0.01" name="alis_fiyati" placeholder="Alış Fiyatı" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px;" required><br>
                <input type="number" step="0.01" name="satis_fiyati" placeholder="Satış Fiyatı" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px;" required><br>
                <input type="number" name="stok_adedi" placeholder="Stok Adedi" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px;" required><br>
                <input type="number" name="kritik_seviye" placeholder="Kritik Seviye" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px;" required><br>
                <textarea name="aciklama" placeholder="Açıklama" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px; height: 60px;"></textarea><br>
                <input type="text" name="tedarikci" placeholder="Tedarikçi" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px;"><br>
                <input type="file" name="resim" style="margin-bottom: 15px; padding: 10px; width: 90%; border-radius: 6px; border: 1.5px solid #3b5998; font-size: 14px; cursor: pointer;" accept="image/*"><br>
                <button type="submit" class="close-button" style="background: #28a745; color: white; padding: 10px 15px; border-radius: 6px; font-size: 14px; cursor: pointer; transition: background 0.3s;">Ekle</button>
                <button type="button" class="close-button close-modal-button" id="closeModal" style="background: #dc3545; color: white; padding: 10px 15px; border-radius: 6px; font-size: 14px; cursor: pointer; transition: background 0.3s;">Kapat</button>
            </form>
        </div>
    </div>

    <div class="footer">
        © 2024 Stok Yönetim Sistemi - Tüm Hakları Saklıdır
    </div>

    <!-- Modal for Selling Product -->
    <div class="modal" id="sellModal">
        <div class="modal-content" style="box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); border-radius: 15px;">
            <h3 style="color: #3b5998; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Ürün Sat</h3>
            <form id="sellForm">
                <select name="urun_adi" style="margin-bottom: 15px; padding: 10px; width: 85%; border-radius: 12px; border: 1.5px solid #3b5998; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); font-size: 14px; background-color: #ffffff; cursor: pointer;" required>
                    <option value="">Ürün Seçin</option>
                    <?php
                    $sql = "SELECT urun_adi, stok_adedi FROM ürünler WHERE stok_adedi > 0";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            echo "<option value='" . $row['urun_adi'] . "'>" . $row['urun_adi'] . " (Stok: " . $row['stok_adedi'] . ")</option>";
                        }
                    } else {
                        echo "<option value=''>Satılabilir ürün bulunamadı</option>";
                    }
                    ?>
                </select><br>
                <input type="number" name="satis_adedi" placeholder="Satış Adedi" style="margin-bottom: 20px; padding: 12px; width: 90%; border-radius: 8px; border: 2px solid #3b5998;" required><br>
                <button type="submit" class="close-button" style="background: #28a745; color: white; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; transition: background 0.3s;">Sat</button>
                <button type="button" class="close-button" id="closeSellModal" style="background: #dc3545; color: white; padding: 12px 20px; border-radius: 8px; font-size: 16px; cursor: pointer; transition: background 0.3s;">Kapat</button>
            </form>
        </div>
    </div>

    <!-- Modal for Stock Status -->
    <div class="modal" id="stockStatusModal">
        <div class="modal-content" style="box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); border-radius: 15px; padding: 20px; max-width: 600px;">
            <h3 style="color: #3b5998; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Stok Durumu</h3>
            <div class="filter-container" style="margin-bottom: 20px;">
                <input type="text" id="searchProductCode" placeholder="Ürün Adı ile Ara" style="padding: 10px; width: 45%; margin-bottom: 10px; border-radius: 6px; border: 1.5px solid #3b5998;">
                <select id="stockStatusFilter" style="padding: 10px; width: 45%; border-radius: 6px; border: 1.5px solid #3b5998;">
                    <option value="">Stok Durumu Seçin</option>
                    <option value="yeterli">Yeterli Stok</option>
                    <option value="yetersiz">Yetersiz Stok</option>
                </select>
                <select id="categoryFilter" style="padding: 10px; width: 45%; border-radius: 6px; border: 1.5px solid #3b5998; margin-top: 10px;">
                    <option value="">Kategori Seçin</option>
                    <?php
                    $kategori_sql = "SELECT DISTINCT kategori FROM ürünler";
                    $kategori_result = $conn->query($kategori_sql);
                    if ($kategori_result->num_rows > 0) {
                        while($kategori_row = $kategori_result->fetch_assoc()) {
                            echo "<option value='" . $kategori_row['kategori'] . "'>" . $kategori_row['kategori'] . "</option>";
                        }
                    }
                    ?>
                </select>
                <button id="applyFilters" style="margin-top: 10px; padding: 10px 20px; border-radius: 6px; background: #3b5998; color: white; border: none; cursor: pointer;">Filtrele</button>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr data-category="<?php echo htmlspecialchars($row['kategori']); ?>">
                        <th style="padding: 10px; border: 1px solid #ddd;">Ürün Adı</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Stok Adedi</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Kritik Seviye</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Durum</th>
                    </tr>
                </thead>
                <tbody id="stockStatusTable">
                    <?php
                    $sql = "SELECT urun_adi, stok_adedi, kritik_seviye, kategori FROM ürünler";
                    $result = $conn->query($sql);
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $durum = $row['stok_adedi'] < $row['kritik_seviye'] ? 'Yetersiz Stok' : 'Yeterli Stok';
                            $durumClass = $row['stok_adedi'] < $row['kritik_seviye'] ? 'style="background-color: #ffcccc;"' : '';
                            echo "<tr $durumClass data-category='" . htmlspecialchars($row['kategori']) . "'>";
                            echo "<td style='padding: 10px; border: 1px solid #ddd;'>{$row['urun_adi']}</td>";
                            echo "<td style='padding: 10px; border: 1px solid #ddd;'>{$row['stok_adedi']}</td>";
                            echo "<td style='padding: 10px; border: 1px solid #ddd;'>{$row['kritik_seviye']}</td>";
                            echo "<td style='padding: 10px; border: 1px solid #ddd;'>{$durum}</td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='4' style='padding: 10px; text-align: center;'>Stok bilgisi bulunamadı.</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
            <button type="button" class="close-button" id="closeStockStatusModal" style="margin-top: 20px; background: #dc3545; color: white; padding: 10px 15px; border-radius: 6px; font-size: 14px; cursor: pointer; transition: background 0.3s;">Kapat</button>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const stockStatusButton = document.querySelector('.card:nth-child(6)');
            const stockStatusModal = document.querySelector('#stockStatusModal');
            const closeStockStatusModalButton = document.querySelector('#closeStockStatusModal');

            // Stok Durumu Modal setup
            stockStatusButton.addEventListener('click', function(event) {
                event.preventDefault();
                stockStatusModal.style.display = 'flex';
                stockStatusModal.scrollIntoView({ behavior: 'smooth' });
            });

            closeStockStatusModalButton.addEventListener('click', function() {
                stockStatusModal.style.display = 'none';
            });

            window.addEventListener('click', function(event) {
                if (event.target === stockStatusModal) {
                    stockStatusModal.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>
