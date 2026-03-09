FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY app.py .

# Expose port
EXPOSE 4000

# Run with uvicorn for production
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "4000"]
