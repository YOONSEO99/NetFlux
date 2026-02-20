# ⚡ NetFlux: Network Operations Central

> **"Bridging the gap between raw network data and human-centric monitoring."**

**NetFlux** is a specialized network monitoring and visualization platform designed to simplify the management of complex multi-vendor network infrastructures. It provides real-time visibility into device health and logical connectivity.

---

## 🎯 Project Goals & Mission

### **Mission**
To empower network administrators with an intuitive, real-time visualization tool that bridges the gap between raw network data and human-centric monitoring.

### **Key Objectives**
* 📊 **Centralized Monitoring:** Consolidate status data from various network devices into a single unified view.
* 🔍 **Visual Clarity:** Transform abstract network logs into an interactive topology map for faster troubleshooting.
* ⚡ **Reactive Architecture:** Utilize **Angular** and **RxJS** to handle asynchronous data streams with high responsiveness.

---

## 🚀 Main Functions

* 🖥️ **Real-time Inventory Dashboard:** Centralized monitoring for devices from vendors like Cisco, Arista, and Juniper.
* 🛰️ **Live Status Tracking:** Real-time health-check simulation (Online/Offline) using **RxJS Observables**.
* 🕸️ **Interactive Network Topology Map:** Visual representation of physical and logical network connections using `ngx-graph`.
* 📝 **Device Management (CRUD):** Robust interface for adding, updating, and managing network nodes with reactive forms.
* 📜 **Event Logging:** Real-time logging of network events, such as Link Up/Down status changes.

---

## 🛠️ Tech Stack

* **Frontend:** Angular (v17+)
* **State Management:** RxJS (Asynchronous Data Streams)
* **Persistence:** LocalStorage API (State Hydration)
* **Styling:** CSS3 (Electric Yellow Theme)
* **Visualization:** ngx-graph / SVG

---

## 💡 Quick Start
1. **Clone the repository:** `git clone <your-repository-url>`
2. **Install dependencies:** `npm install`
3. **Start the app:** `ng serve`

> **Note**: This project is designed to run entirely in the browser using **LocalStorage** for data persistence. No external database is required for the demo.