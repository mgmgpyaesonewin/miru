#!/usr/bin/env python
 
from http.server import BaseHTTPRequestHandler, HTTPServer
from hatesonar import Sonar
import json
from urllib.parse import urlparse, parse_qs
 
# HTTPRequestHandler class
class testHTTPServer_RequestHandler(BaseHTTPRequestHandler):
 
  def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

  # GET
  def do_GET(self):
 
        query_components = parse_qs(urlparse(self.path).query)
        imsi = query_components["imsi"] 
        print(imsi)

        # Send headers
        self._set_headers()

        # Send message back to client
        sonar = Sonar()
        message = sonar.ping(text=str(imsi[0]))
        # Write content as utf-8 data
        self.wfile.write(bytes(json.dumps(message), "utf-8"))
        return message
 
def run():
  print('starting server...')
 
  # Server settings
  # Choose port 8080, for port 80, which is normally used for a http server, you need root access
  server_address = ('127.0.0.1', 8081)
  httpd = HTTPServer(server_address, testHTTPServer_RequestHandler)
  print('running server...')
  httpd.serve_forever()
 
 
run()