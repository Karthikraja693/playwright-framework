from moviepy.editor import ImageClip, AudioFileClip
from gtts import gTTS

# Tamil text
tamil_text = """
என் மகன் பெயர் கார்த்திக்ராஜா, வயது 36. தேவாங்க செட்டியார் சமூகத்தைச் சேர்ந்தவர். சாப்ட்வேர் என்ஜினீயராக Accenture Bengaluru நிறுவனத்தில் வேலை செய்கிறார். மாத வருமானம் ஒரு லட்சம். சொந்த வீடும் கார் வசதியும் உள்ளது. அவர் உடல் ஊனமுற்றவர் — நடக்க முடியாது. இருந்தாலும் அவர் அனைத்து வேலைகளையும் தானாகச் செய்து கொள்ளக்கூடிய திறமை உடையவர். கார் ஓட்டுவார். அவருக்கு ஏற்ற நல்ல மணமகள் தேவை. தொடர்புக்கு: 9123576997
"""

# Convert Tamil text to speech
tts = gTTS(text=tamil_text, lang='ta')
tts.save("voice.mp3")

# Load image and resize
image_clip = ImageClip("my_photo.jpg").resize(height=720)

# Load audio
audio_clip = AudioFileClip("voice.mp3")

# Match duration and add audio
image_clip = image_clip.set_duration(audio_clip.duration)
image_clip = image_clip.set_audio(audio_clip)

# Export video
image_clip.write_videofile("output_video.mp4", fps=24)