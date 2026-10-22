# village-prodect 
# 🌿 GaonKart — Village Products Marketplace

GaonKart is a simple, responsive website concept for showcasing village products and helping customers prepare orders through WhatsApp.

## Features

- Responsive homepage
- Product search
- Product details page
- Fresh fruits category
- Shopping cart with quantity controls
- Customer checkout form
- WhatsApp order message
- Browser-based order history
- GitHub Pages compatible static website

## Project Files

| File | Purpose |
|---|---|
| `index.html` | Main homepage and product catalogue |
| `about.html` | About the project |
| `descripation-page.html` | Product details |
| `fruits.html` | Fruits category |
| `user-caet.html` | Shopping cart and WhatsApp checkout |
| `user-dashboard.html` | Locally saved order records |
| `README.md` | Project documentation |

## How to Run

1. Open `index.html` in a browser, or publish the repository using GitHub Pages.
2. Browse products and click **Add to Cart**.
3. Open the Cart page.
4. Enter customer and delivery details.
5. Click **Order on WhatsApp**.
6. Review the message in WhatsApp and press **Send**.

## Configure WhatsApp

Open `user-caet.html` and find:

`const WHATSAPP_NUMBER = "91XXXXXXXXXX";`

Replace the placeholder with your WhatsApp number in international format using digits only.

Example format: `91` followed by your 10-digit mobile number.

Do not include `+`, spaces, or hyphens in the configured number.

## Enable GitHub Pages

1. Open your GitHub repository.
2. Go to **Settings**.
3. Select **Pages**.
4. Under Build and deployment, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Click **Save**.
7. Wait for GitHub Pages to publish the website.

## Important Limitations

- Cart and order records are stored in the current browser using `localStorage`.
- Records do not automatically sync between devices or users.
- WhatsApp opens a prefilled message; the customer must press Send.
- The website does not verify message delivery, order acceptance, inventory, or payment.
- Product prices, availability, images, and delivery details should be checked before accepting real orders.

## Technologies

- HTML5
- CSS3
- JavaScript
- Browser localStorage
- WhatsApp Click to Chat
- GitHub Pages

## License

This project is provided as a learning/demo project. Add a suitable license before distributing it publicly.
