# Dockerfile for Python image
FROM python:latest
WORKDIR /exec

CMD [ "python3", "prog.py" ]