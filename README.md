<div align="center">
  <br />
    <img src="./public/github-banner.png" alt="Project Banner">
  <br />

  <div>
    <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="next.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white&color=00758F" alt="MySQL" />
  </div>

  <h3 align="center">🔒 Next Authentication 🔒</h3>

</div>


## 📋 <a name="table">Table of Contents</a>
1. ⚙️ [Tech Stack](#tech-stack)
2. 🔋 [Features](#features)
3. 🤸 [Quick Start](#quick-start)
4. ✏️ [Personalization](#personalization)
5. 📄 [License](#license)


## <a name="tech-stack">⚙️ Tech Stack</a>
- Next JS
- Tailwind CSS


## <a name="features">🔋 Features</a>
- ✅ **Password salt**
- 🔄 **DB session**
- 🔄 **Password reset**


## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/pietropeerani/next-mysql-auth.git
cd next-mysql-auth
```

**Installation**

Install the project dependencies using npm:

```bash
npm i
```

**Running the Project**

```bash
npm run dev

npm run dev -- -H 0.0.0.0 -p 3000 # host development server on local network
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.


## <a name="personalization">✏️ Personalization</a>
**Set Up Enviroment Variables**

Go to `@/next.config.mjs` to modify the general info:
```JSON
"env": {
    "host": "",
    "port": "3306",
    "user": "",
    "password": "",
    "database": "",

    "host_dev": "localhost",
    "port_dev": "",
    "user_dev": "root",
    "password_dev": "",
    "database_dev": "next-mysql-auth"
}
```

Create the `@/.env.local` file to modify security info:
```shell
SESSION_SECRET=""    # string for the cryptography
```



<div align="center">
  <br />
    <img src="./public/github-banner.png" alt="Project Banner">
  <br />

</div>


## <a name="license">📄 License</a>
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.