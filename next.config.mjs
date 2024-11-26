/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        host: '',
        port: '3306',
        user: '',
        password: '',
        database: '',

        host_dev: 'localhost',
        port_dev: '',
        user_dev: 'root',
        password_dev: '',
        database_dev: 'next-mysql-auth'
    }
};

export default nextConfig;
