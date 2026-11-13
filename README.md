# KS28 Lottery Platform

A real-time "28"-style lottery game platform, kept here as a system-design study.

Draw results are pulled from public lottery feeds every few seconds. Players place bets over a single encrypted WebSocket, each round is settled automatically, and payouts reach every connected client within the same second. A separate back-office app lets operators manage users, agents, balances and promotions.

The interesting part of this project is the architecture: how the services are split, how Redis acts as the event backbone between them, and how a round flows from draw to payout. That is covered in the design doc.

**→ [System design](docs/SYSTEM_DESIGN.md)**

## Repository layout

| Folder | Role |
|---|---|
| `frontend_web` | Player web app (React) |
| `frontend_admin` | Back-office app (Umi · Ant Design Pro) |
| `backend_web` | Player WebSocket gateway |
| `backend_admin` | Admin WebSocket gateway |
| `backend_keys` | Issues connection keys for both gateways |
| `backend_lottery` | Draw intake and round clock |
| `backend_async_center` | Bet settlement and balance ledger |
| `backend_automation` | Room simulation and leaderboard jobs |
| `api_lottery` | Scrapers for the public draw feeds |
| `backend_nginx` | Nginx config in front of the gateways |
| `docs` | System design write-up |

## Stack

Node.js · Express · ws · Sequelize · MariaDB/MySQL · Redis · React · Umi / Ant Design Pro · PM2 · Nginx
