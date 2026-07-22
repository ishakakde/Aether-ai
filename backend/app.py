# # # from flask import Flask, request, jsonify, send_from_directory
# # # from flask_cors import CORS
# # # import requests
# # # import base64
# # # import os
# # # from dotenv import load_dotenv

# # # load_dotenv()

# # # app = Flask(__name__)
# # # CORS(app)

# # # # Get HuggingFace token from environment variable
# # # HF_TOKEN = os.getenv("HF_TOKEN", "")

# # # # Hugging Face Inference API endpoint for Flux Dev model
# # # # API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev"
# # # API_URL = "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell"
# # # headers = {
# # #     "Authorization": f"Bearer {HF_TOKEN}"
# # # }

# # # def query_hf_api(payload):
# # #     """
# # #     Query Hugging Face Inference API
# # #     This uses HuggingFace's free inference API - no local GPU needed!
# # #     """
# # #     response = requests.post(API_URL, headers=headers, json=payload, timeout=120)
# # #     return response

# # # @app.route('/generate', methods=['POST'])
# # # def generate_image():
# # #     """Generate image from prompt using Flux Dev model via HuggingFace API"""
# # #     try:
# # #         data = request.json
# # #         prompt = data.get('prompt', '')
# # #         width = data.get('width', 1024)
# # #         height = data.get('height', 1024)
# # #         steps = data.get('steps', 28)
        
# # #         # Validation
# # #         if not prompt:
# # #             return jsonify({'error': 'Prompt is required'}), 400
        
# # #         if not HF_TOKEN:
# # #             return jsonify({
# # #                 'error': 'HuggingFace token not configured. Please set HF_TOKEN environment variable.',
# # #                 'help': 'Get your token from https://huggingface.co/settings/tokens'
# # #             }), 401
        
# # #         print(f"Generating image: {prompt[:60]}...")
# # #         print(f"Parameters: {width}x{height}, steps={steps}")
        
# # #         # Query the Hugging Face Inference API
# # #         payload = {
# # #             "inputs": prompt,
# # #             "parameters": {
# # #                 "width": width,
# # #                 "height": height,
# # #                 "num_inference_steps": steps
# # #             }
# # #         }
        
# # #         response = query_hf_api(payload)
        
# # #         # Check if request was successful
# # #         if response.status_code == 503:
# # #             return jsonify({
# # #                 'error': 'Model is loading',
# # #                 'message': 'The model is currently loading. Please try again in 20-30 seconds.'
# # #             }), 503
        
# # #         if response.status_code == 401:
# # #             return jsonify({
# # #                 'error': 'Invalid HuggingFace token',
# # #                 'message': 'Please check your HF_TOKEN is valid and has access to the model.'
# # #             }), 401
        
# # #         if response.status_code != 200:
# # #             error_msg = f"API Error: {response.status_code}"
# # #             try:
# # #                 error_data = response.json()
# # #                 error_msg = error_data.get('error', error_msg)
# # #             except:
# # #                 pass
# # #             return jsonify({'error': error_msg}), response.status_code
        
# # #         # Get image bytes
# # #         image_bytes = response.content
        
# # #         # Convert to base64 for sending to frontend
# # #         img_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
# # #         print("✓ Image generated successfully!")
        
# # #         return jsonify({
# # #             'success': True,
# # #             'image': img_base64,
# # #             'message': 'Image generated successfully'
# # #         })
    
# # #     except requests.exceptions.Timeout:
# # #         return jsonify({
# # #             'error': 'Request timeout',
# # #             'message': 'The request took too long. Try reducing steps or image size.'
# # #         }), 504
    
# # #     except Exception as e:
# # #         print(f"Error: {str(e)}")
# # #         return jsonify({
# # #             'error': 'Internal server error',
# # #             'message': str(e)
# # #         }), 500


# # # @app.route('/health', methods=['GET'])
# # # def health_check():
# # #     """Health check endpoint"""
# # #     return jsonify({
# # #         'status': 'healthy',
# # #         'model': 'FLUX.1-dev by Black Forest Labs',
# # #         'api': 'HuggingFace Inference API (Free)',
# # #         'token_configured': bool(HF_TOKEN and HF_TOKEN != "your_hf_token_here"),
# # #         'note': 'No local GPU required - runs on HuggingFace servers'
# # #     })

# # # @app.route('/')
# # # def index():
# # #     """Serve the main HTML page"""
# # #     return send_from_directory('views', 'index.html')

# # # @app.route('/<path:filename>')
# # # def serve_static(filename):
# # #     """Serve static files (CSS, JS)"""
# # #     return send_from_directory('views', filename)

# # # if __name__ == '__main__':
# # #     print("\n" + "="*70)
# # #     print(" 🎨 FLUX DEV IMAGE GENERATOR SERVER")
# # #     print("="*70)
# # #     print(f" Server running at: http://localhost:5000")
# # #     print(f" Model: black-forest-labs/FLUX.1-dev")
# # #     print(f" API: HuggingFace Inference (Free - No GPU needed!)")
# # #     print("="*70)
    
# # #     if not HF_TOKEN or HF_TOKEN == "your_hf_token_here":
# # #         print("\n ⚠️  WARNING: HuggingFace token not configured!")
# # #         print(" Please set HF_TOKEN environment variable or create .env file:")
# # #         print(" 1. Get token from: https://huggingface.co/settings/tokens")
# # #         print(" 2. Create .env file with: HF_TOKEN=your_token_here")
# # #         print(" 3. Make sure you have access to FLUX.1-dev model\n")
# # #     else:
# # #         print(f"\n ✓ HuggingFace token configured")
# # #         print(" ✓ Ready to generate images!\n")
    
# # #     print("="*70 + "\n")
    
# # #     app.run(host='0.0.0.0', port=5000, debug=True)







# # from flask import Flask, request, jsonify, send_from_directory
# # from flask_cors import CORS
# # import os
# # import io
# # import base64
# # from dotenv import load_dotenv
# # from huggingface_hub import InferenceClient

# # load_dotenv()

# # app = Flask(__name__)
# # CORS(app)

# # # Get HuggingFace token from environment variable
# # HF_TOKEN = os.getenv("HF_TOKEN", "")

# # # Initialize Hugging Face InferenceClient
# # client = InferenceClient(token=HF_TOKEN) if HF_TOKEN else None

# # @app.route('/generate', methods=['POST'])
# # def generate_image():
# #     """Generate image from prompt using Hugging Face Inference Client"""
# #     try:
# #         data = request.json
# #         prompt = data.get('prompt', '')
        
# #         # Validation
# #         if not prompt:
# #             return jsonify({'error': 'Prompt is required'}), 400
        
# #         if not HF_TOKEN:
# #             return jsonify({
# #                 'error': 'HuggingFace token not configured. Please set HF_TOKEN environment variable.',
# #                 'help': 'Get your token from https://huggingface.co/settings/tokens'
# #             }), 401
        
# #         print(f"Generating image: {prompt[:60]}...")
        
# #         # Models to try in order of fallback
# #         models_to_try = [
# #             "stabilityai/stable-diffusion-3.5-large",
# #             "black-forest-labs/FLUX.1-schnell",
# #             "runwayml/stable-diffusion-v1-5"
# #         ]
        
# #         image = None
# #         last_error = ""

# #         for model in models_to_try:
# #             try:
# #                 print(f"Attempting with model: {model}")
# #                 image = client.text_to_image(
# #                     prompt=prompt,
# #                     model=model
# #                 )
# #                 if image:
# #                     break
# #             except Exception as err:
# #                 last_error = str(err)
# #                 print(f"Failed with {model}: {last_error}")
# #                 continue

# #         if not image:
# #             return jsonify({
# #                 'error': 'Image generation failed',
# #                 'message': last_error or 'All model providers failed or timed out.'
# #             }), 500

# #         # Convert PIL Image to Base64
# #         buffered = io.BytesIO()
# #         image.save(buffered, format="PNG")
# #         img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
# #         print("✓ Image generated successfully!")
        
# #         return jsonify({
# #             'success': True,
# #             'image': img_base64,
# #             'message': 'Image generated successfully'
# #         })

# #     except Exception as e:
# #         print(f"Error: {str(e)}")
# #         return jsonify({
# #             'error': 'Internal server error',
# #             'message': str(e)
# #         }), 500


# # @app.route('/health', methods=['GET'])
# # def health_check():
# #     """Health check endpoint"""
# #     return jsonify({
# #         'status': 'healthy',
# #         'api': 'HuggingFace InferenceClient',
# #         'token_configured': bool(HF_TOKEN and HF_TOKEN != "your_hf_token_here")
# #     })

# # @app.route('/')
# # def index():
# #     """Serve the main HTML page"""
# #     return send_from_directory('views', 'index.html')

# # @app.route('/<path:filename>')
# # def serve_static(filename):
# #     """Serve static files (CSS, JS)"""
# #     return send_from_directory('views', filename)

# # if __name__ == '__main__':
# #     print("\n======================================================================")
# #     print(" 🎨 AI IMAGE GENERATOR SERVER")
# #     print("======================================================================")
# #     print(" Server running at: http://localhost:5000")
# #     print("======================================================================\n")
    
# #     app.run(host='0.0.0.0', port=5000, debug=True)













# import base64
# import urllib.parse
# from flask import Flask, jsonify, request, send_from_directory
# from flask_cors import CORS
# import requests

# app = Flask(__name__)

# # Enable CORS for all routes (allows React dev server on port 5173 to talk to Flask on port 5000)
# CORS(app, resources={r"/api/*": {"origins": "*"}})


# @app.route('/api/generate', methods=['POST', 'OPTIONS'])
# def generate_image():
#     """Generate image from prompt using Pollinations AI (Free FLUX Model)"""
#     # Handle preflight OPTIONS request sent by browsers during CORS requests
#     if request.method == 'OPTIONS':
#         return jsonify({'status': 'ok'}), 200

#     try:
#         data = request.json or {}
#         prompt = data.get('prompt', '')
#         width = data.get('width', 1024)
#         height = data.get('height', 1024)

#         # Validation
#         if not prompt:
#             return jsonify({'error': 'Prompt is required'}), 400

#         print(f"Generating image: {prompt[:60]}...")

#         # Encode prompt safely for the URL
#         encoded_prompt = urllib.parse.quote(prompt)

#         # Pollinations AI Endpoint (Uses FLUX model for free without rate limits)
#         pollinations_url = f'https://image.pollinations.ai/prompt/{encoded_prompt}?width={width}&height={height}&model=flux&nologo=true'

#         # Fetch the generated image from Pollinations
#         response = requests.get(pollinations_url, timeout=60)

#         if response.status_code == 200:
#             # Convert raw image bytes to Base64 to send to React frontend
#             img_base64 = base64.b64encode(response.content).decode('utf-8')

#             print('✓ Image generated successfully!')

#             return jsonify({
#                 'success': True,
#                 'image': img_base64,
#                 'message': 'Image generated successfully',
#             }), 200
#         else:
#             return jsonify({
#                 'error': 'Failed to generate image',
#                 'message': f'Pollinations server returned status {response.status_code}',
#             }), response.status_code

#     except requests.exceptions.Timeout:
#         return jsonify({
#             'error': 'Request timeout',
#             'message': 'The request took too long to complete. Try again.',
#         }), 504

#     except Exception as e:
#         print(f'Error: {str(e)}')
#         return jsonify({'error': 'Internal server error', 'message': str(e)}), 500


# @app.route('/health', methods=['GET'])
# def health_check():
#     """Health check endpoint"""
#     return jsonify({
#         'status': 'healthy', 
#         'api': 'Pollinations AI (Free Unlimited)'
#     }), 200


# @app.route('/')
# def index():
#     """Serve index if accessing root directly"""
#     return jsonify({'message': 'NEXUS AI Flask API backend is online!'}), 200


# if __name__ == '__main__':
#     print('\n' + '=' * 70)
#     print(' 🎨 POLLINATIONS AI IMAGE GENERATOR SERVER')
#     print('=' * 70)
#     print(' Server running at: http://localhost:5000')
#     print(' API Endpoint: http://localhost:5000/api/generate')
#     print(' API Status: Free & Unlimited (No API key needed!)')
#     print('=' * 70 + '\n')

#     app.run(host='0.0.0.0', port=5000, debug=True)









# import base64
# import random
# import urllib.parse
# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import requests

# app = Flask(__name__)

# # Enable CORS for React frontend (Port 5173 -> Flask Port 5000)
# CORS(app, resources={r"/api/*": {"origins": "*"}})

# # Descriptors for prompt enhancement engine
# ENHANCEMENT_MODIFIERS = {
#     "lighting": [
#         "dramatic cinematic lighting",
#         "volumetric golden hour glow",
#         "neon cyberpunk reflections",
#         "soft moody studio illumination",
#         "bioluminescent ambient accent",
#     ],
#     "details": [
#         "hyperrealistic textures",
#         "8k resolution masterpiece",
#         "intricate fine detail",
#         "photorealistic depth of field",
#         "unreal engine 5 render quality",
#     ],
#     "framing": [
#         "wide-angle shot",
#         "detailed close-up portrait",
#         "dramatic low-angle perspective",
#         "action-packed composition",
#         "epic landscape framing",
#     ],
# }


# @app.route("/api/enhance-prompt", methods=["POST", "OPTIONS"])
# def enhance_prompt():
#   """AI Prompt Expansion Engine"""
#   if request.method == "OPTIONS":
#     return jsonify({"status": "ok"}), 200

#   try:
#     data = request.json or {}
#     user_prompt = data.get("prompt", "").strip()

#     if not user_prompt:
#       return jsonify({"error": "Prompt is required to enhance"}), 400

#     # Pick random aesthetic descriptors
#     lighting = random.choice(ENHANCEMENT_MODIFIERS["lighting"])
#     detail = random.choice(ENHANCEMENT_MODIFIERS["details"])
#     framing = random.choice(ENHANCEMENT_MODIFIERS["framing"])

#     # Build enhanced prompt string
#     enhanced = f"{user_prompt}, {framing}, {lighting}, {detail}, sharp focus, trending on artstation"

#     return jsonify({"success": True, "enhanced_prompt": enhanced}), 200

#   except Exception as e:
#     return jsonify({"error": "Failed to enhance prompt", "message": str(e)}), 500


# @app.route("/api/generate", methods=["POST", "OPTIONS"])
# def generate_image():
#   """Generate image from prompt using Pollinations AI (Free FLUX Model)"""
#   if request.method == "OPTIONS":
#     return jsonify({"status": "ok"}), 200

#   try:
#     data = request.json or {}
#     prompt = data.get("prompt", "")
#     width = data.get("width", 1024)
#     height = data.get("height", 1024)

#     if not prompt:
#       return jsonify({"error": "Prompt is required"}), 400

#     print(f"Generating image: {prompt[:60]}...")

#     # Safely encode prompt for URL
#     encoded_prompt = urllib.parse.quote(prompt)
#     pollinations_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={width}&height={height}&model=flux&nologo=true"

#     # Fetch image from Pollinations API
#     response = requests.get(pollinations_url, timeout=60)

#     if response.status_code == 200:
#       img_base64 = base64.b64encode(response.content).decode("utf-8")
#       print("✓ Image generated successfully!")
#       return jsonify({
#           "success": True,
#           "image": img_base64,
#           "message": "Image generated successfully",
#       }), 200
#     else:
#       return jsonify({
#           "error": "Failed to generate image",
#           "message": f"Pollinations server returned status {response.status_code}",
#       }), response.status_code

#   except requests.exceptions.Timeout:
#     return jsonify({
#         "error": "Request timeout",
#         "message": "The request took too long to complete. Try again.",
#     }), 504

#   except Exception as e:
#     print(f"Error: {str(e)}")
#     return jsonify({"error": "Internal server error", "message": str(e)}), 500


# @app.route("/health", methods=["GET"])
# def health_check():
#   return jsonify(
#       {"status": "healthy", "api": "Pollinations AI (Free Unlimited)"}
#   ), 200


# if __name__ == "__main__":
#   print("\n" + "=" * 70)
#   print(" 🎨 NEXUS AI - POLLINATIONS IMAGE GENERATOR SERVER")
#   print("=" * 70)
#   print(" Server running at: http://localhost:5000")
#   print(" API Endpoint: http://localhost:5000/api/generate")
#   print("=" * 70 + "\n")

#   app.run(host="0.0.0.0", port=5000, debug=True)






import base64
import os
import random
import urllib.parse
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)

# Enable CORS for cross-origin requests from Vercel/Netlify frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Descriptors for prompt enhancement engine
ENHANCEMENT_MODIFIERS = {
    "lighting": [
        "dramatic cinematic lighting",
        "volumetric golden hour glow",
        "neon cyberpunk reflections",
        "soft moody studio illumination",
        "bioluminescent ambient accent",
    ],
    "details": [
        "hyperrealistic textures",
        "8k resolution masterpiece",
        "intricate fine detail",
        "photorealistic depth of field",
        "unreal engine 5 render quality",
    ],
    "framing": [
        "wide-angle shot",
        "detailed close-up portrait",
        "dramatic low-angle perspective",
        "action-packed composition",
        "epic landscape framing",
    ],
}


@app.route("/api/enhance-prompt", methods=["POST", "OPTIONS"])
def enhance_prompt():
  """AI Prompt Expansion Engine"""
  if request.method == "OPTIONS":
    return jsonify({"status": "ok"}), 200

  try:
    data = request.json or {}
    user_prompt = data.get("prompt", "").strip()

    if not user_prompt:
      return jsonify({"error": "Prompt is required to enhance"}), 400

    # Pick random aesthetic descriptors
    lighting = random.choice(ENHANCEMENT_MODIFIERS["lighting"])
    detail = random.choice(ENHANCEMENT_MODIFIERS["details"])
    framing = random.choice(ENHANCEMENT_MODIFIERS["framing"])

    # Build enhanced prompt string
    enhanced = f"{user_prompt}, {framing}, {lighting}, {detail}, sharp focus, trending on artstation"

    return jsonify({"success": True, "enhanced_prompt": enhanced}), 200

  except Exception as e:
    return jsonify({"error": "Failed to enhance prompt", "message": str(e)}), 500


@app.route("/api/generate", methods=["POST", "OPTIONS"])
def generate_image():
  """Generate image from prompt using Pollinations AI (Free FLUX Model)"""
  if request.method == "OPTIONS":
    return jsonify({"status": "ok"}), 200

  try:
    data = request.json or {}
    prompt = data.get("prompt", "")
    width = data.get("width", 1024)
    height = data.get("height", 1024)

    if not prompt:
      return jsonify({"error": "Prompt is required"}), 400

    print(f"Generating image: {prompt[:60]}...")

    # Safely encode prompt for URL
    encoded_prompt = urllib.parse.quote(prompt)
    pollinations_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={width}&height={height}&model=flux&nologo=true"

    # Fetch image from Pollinations API
    response = requests.get(pollinations_url, timeout=60)

    if response.status_code == 200:
      img_base64 = base64.b64encode(response.content).decode("utf-8")
      print("✓ Image generated successfully!")
      return jsonify({
          "success": True,
          "image": img_base64,
          "message": "Image generated successfully",
      }), 200
    else:
      return jsonify({
          "error": "Failed to generate image",
          "message": f"Pollinations server returned status {response.status_code}",
      }), response.status_code

  except requests.exceptions.Timeout:
    return jsonify({
        "error": "Request timeout",
        "message": "The request took too long to complete. Try again.",
    }), 504

  except Exception as e:
    print(f"Error: {str(e)}")
    return jsonify({"error": "Internal server error", "message": str(e)}), 500


@app.route("/health", methods=["GET"])
def health_check():
  return jsonify(
      {"status": "healthy", "api": "Pollinations AI (Free Unlimited)"}
  ), 200


@app.route("/", methods=["GET"])
def index():
  return jsonify({"status": "online", "message": "Aether AI API Server"}), 200


if __name__ == "__main__":
  # Bind dynamically to the port provided by hosting services (Render/Heroku)
  port = int(os.environ.get("PORT", 5000))

  print("\n" + "=" * 70)
  print(" 🎨 AETHER AI - IMAGE GENERATOR SERVER")
  print("=" * 70)
  print(f" Server running on port: {port}")
  print("=" * 70 + "\n")

  # Set debug to False for production execution
  debug_mode = os.environ.get("FLASK_ENV") == "development"
  app.run(host="0.0.0.0", port=port, debug=debug_mode)