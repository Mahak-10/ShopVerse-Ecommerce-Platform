const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const imagesDir = path.join(__dirname, 'sb-ecom', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const imagesToDownload = [
    { name: 'headphones.jpg', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop' },
    { name: 'smartphone.jpg', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop' },
    { name: 'laptop.jpg', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop' },
    { name: 'mens_jacket.jpg', url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop' },
    { name: 'womens_dress.jpg', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop' },
    { name: 'running_shoes.jpg', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop' },
    { name: 'coffee_maker.jpg', url: 'https://images.unsplash.com/photo-1517668808822-9e428824603b?w=600&auto=format&fit=crop' },
    { name: 'desk_lamp.jpg', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop' },
    { name: 'skincare.jpg', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop' },
    { name: 'electric_toothbrush.jpg', url: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&auto=format&fit=crop' },
    { name: 'water_bottle.jpg', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop' },
    { name: 'yoga_mat.jpg', url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop' },
    { name: 'book.jpg', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop' },
    { name: 'journal.jpg', url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&auto=format&fit=crop' },
    { name: 'board_game.jpg', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop' },
    { name: 'stroller.jpg', url: 'https://images.unsplash.com/photo-1591019378198-92040d34bca6?w=600&auto=format&fit=crop' },
    { name: 'car_wash.jpg', url: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop' },
    { name: 'watch.jpg', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop' },
    { name: 'backpack.jpg', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop' },
    { name: 'gourmet_coffee.jpg', url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop' }
];

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function run() {
    console.log('Downloading 20 product images...');
    for (const item of imagesToDownload) {
        const dest = path.join(imagesDir, item.name);
        try {
            await downloadImage(item.url, dest);
            console.log(`Downloaded: ${item.name}`);
        } catch (e) {
            console.error(`Failed to download ${item.name}: ${e.message}`);
        }
    }
    console.log('All images downloaded successfully!');
}

run();
