const language = require('@google-cloud/language');

class MenuAnalyzer {
  constructor() {
    this.client = new language.LanguageServiceClient();
  }

  async analyzeMenuText(text) {
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    try {
        const [result] = await this.client.analyzeEntities({ document });
  
        const entities = result.entities;
        const menuItems = {};
        let currentMenuItem = null;
  
        entities.forEach((entity) => {
          //console.log(entity)
          if (
            (entity.type === 'DISH' || entity.type === 'CONSUMER_GOOD' || entity.type === 'OTHER') &&
            entity.name === entity.name.toUpperCase() &&  // Check if name is in uppercase
            /[A-Za-z]/.test(entity.name)                // Check if name is a single letter
          ) {
            // This entity represents a menu item
            currentMenuItem = entity.name;
            menuItems[currentMenuItem] = [];
          } else if (currentMenuItem) {
            // If we have a current menu item, append the entity name as an ingredient
            if (/[A-Za-z]/.test(entity.name))
                menuItems[currentMenuItem].push(entity.name);
          }          
        });
  
        return menuItems;
      } catch (err) {
        console.error('Error:', err);
        return {};
      }
    }
  }

module.exports = MenuAnalyzer;