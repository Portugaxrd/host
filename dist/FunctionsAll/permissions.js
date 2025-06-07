const fs = require('node:fs')

class Permissions {
    constructor() {
        this.jsonPath = './deploy.json'
        this.permissions = []
        this.loadPermissions()
    }

    loadPermissions() {
        try {
            if (fs.existsSync(this.jsonPath)) {
                const data = fs.readFileSync(this.jsonPath, 'utf8')
                const json = JSON.parse(data);
                this.permissions = json.permissions || []
            } else {
                console.error('Arquivo JSON não encontrado')
            }
        } catch (err) {
            this.permissions = []
        }
    }

    /**
     * Verifica se o usuário tem permissão
     * @param {string} userId - ID do usuário
     * @returns {boolean}
     */
    get(userId) {
        return this.permissions.includes(userId)
    }

    reload() {
        this.loadPermissions();
    }
}

module.exports = Permissions;
