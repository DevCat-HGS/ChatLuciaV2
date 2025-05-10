// Simple response generator for Lucia
export const generateResponse = (userMessage: string): string => {
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  // Greeting patterns
  if (normalizedMessage.match(/^(hola|buenos dias|buenas tardes|buenas noches|saludos|hey|hi)/)) {
    return getRandomResponse([
      '¡Hola! ¿Cómo estás hoy?',
      '¡Hola! Es un placer hablar contigo. ¿En qué puedo ayudarte?',
      '¡Saludos! ¿Cómo te puedo asistir hoy?'
    ]);
  }
  
  // Questions about Lucia
  if (normalizedMessage.includes('quien eres') || 
      normalizedMessage.includes('quién eres') || 
      normalizedMessage.includes('qué eres') || 
      normalizedMessage.includes('que eres')) {
    return getRandomResponse([
      'Soy Lucia, tu asistente virtual. Estoy aquí para conversar y responder a tus preguntas.',
      'Me llamo Lucia, soy un chatbot diseñado para mantener conversaciones y ayudarte con información.',
      'Soy Lucia, un asistente conversacional. ¡Me encanta charlar contigo!'
    ]);
  }
  
  // How are you
  if (normalizedMessage.includes('cómo estás') || 
      normalizedMessage.includes('como estas') || 
      normalizedMessage.includes('qué tal') || 
      normalizedMessage.includes('que tal')) {
    return getRandomResponse([
      '¡Estoy muy bien, gracias por preguntar! ¿Y tú cómo estás?',
      'Estoy funcionando perfectamente, gracias. ¿Qué tal tu día?',
      '¡Todo excelente! Siempre lista para conversar. ¿Cómo va tu día?'
    ]);
  }
  
  // Questions about capabilities
  if (normalizedMessage.includes('qué puedes hacer') || 
      normalizedMessage.includes('que puedes hacer') ||
      normalizedMessage.includes('ayudarme con') ||
      normalizedMessage.includes('para qué sirves') ||
      normalizedMessage.includes('para que sirves')) {
    return getRandomResponse([
      'Puedo mantener una conversación, responder preguntas generales y ayudarte con información. ¿En qué te gustaría que te ayude?',
      'Estoy diseñada para chatear contigo de forma natural. Puedo responder a tus preguntas y mantener una conversación amena.',
      'Mi función principal es conversar y responder a tus preguntas. ¿Hay algo específico en lo que necesites ayuda?'
    ]);
  }
  
  // Thanks
  if (normalizedMessage.includes('gracias') || 
      normalizedMessage.includes('te lo agradezco') || 
      normalizedMessage.includes('muchas gracias')) {
    return getRandomResponse([
      '¡De nada! Estoy aquí para ayudarte.',
      'Es un placer poder asistirte. ¿Hay algo más en lo que pueda ayudarte?',
      '¡No hay de qué! Si necesitas algo más, no dudes en preguntar.'
    ]);
  }
  
  // Goodbye
  if (normalizedMessage.includes('adios') || 
      normalizedMessage.includes('adiós') || 
      normalizedMessage.includes('hasta luego') || 
      normalizedMessage.includes('nos vemos') ||
      normalizedMessage.includes('chao') ||
      normalizedMessage.includes('hasta pronto')) {
    return getRandomResponse([
      '¡Hasta luego! Ha sido un placer chatear contigo.',
      '¡Adiós! Espero volver a conversar pronto.',
      '¡Que tengas un excelente día! Aquí estaré cuando quieras conversar de nuevo.'
    ]);
  }
  
  // Default responses for any other input
  return getRandomResponse([
    'Interesante. ¿Me podrías contar más sobre eso?',
    'Entiendo. ¿Hay algo específico sobre lo que quieras hablar?',
    'Gracias por compartir eso. ¿En qué más puedo ayudarte hoy?',
    'Qué interesante. ¿Hay algo más que te gustaría preguntar?',
    'Comprendo lo que dices. ¿Hay algún otro tema que te interese discutir?',
    'Eso suena bien. ¿Quieres que hablemos de algún otro tema?'
  ]);
};

// Helper function to get a random response from an array
const getRandomResponse = (responses: string[]): string => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};