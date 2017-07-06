#!/usr/bin/python3
import os
import json

with open('/var/www/addiec/assets/config/app.config.json', 'r') as f:
    try:
        json_data = json.load(f)
        json_data['environment'] = os.environ['ENVIRONMENT']
        json_data['public_url'] = os.environ['PUBLIC_URL']
    except KeyError:
        print("Environmental variables not properly set.")
        sys.exit(1)

with open('/var/www/addiec/assets/config/app.config.json', 'w') as f:
    f.write(json.dumps(json_data))