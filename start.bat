docker run --rm -it -p 4000:4000 -v "%cd%:/srv/jekyll" --entrypoint jekyll jekyll/jekyll:4 serve --host 0.0.0.0 --port 4000 --watch
