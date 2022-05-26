import React from 'react';
import './Loading.scss';

const Loading = ({ OnError, id }) => {
  return (
    <>
      {!OnError && (
        <div className="LoadingBar">
          <div className="card">
            <img
              src="https://f.hubspotusercontent40.net/hubfs/6412394/LoadingLogo.gif"
              alt="iK-Load-Animation"
            />
          </div>
        </div>
      )}
      {OnError && (
        <div className="LoadingBar OnError">
          <div className="card">
            <img
              src="data:image/svg+xml;base64,PHN2ZyBpZD0iSWxsdXNfWFNtbF85NnB4Xy1fU29tZXRoaW5nX3dlbnRfd3JvbmciIGRhdGEtbmFtZT0iSWxsdXMgWFNtbCA5NnB4ICAtIFNvbWV0aGluZyB3ZW50IHdyb25nIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiIgdmlld0JveD0iMCAwIDk2IDk2Ij4KICA8ZyBpZD0iaW52aXNpYmxlX2JveCIgZGF0YS1uYW1lPSJpbnZpc2libGUgYm94Ij4KICAgIDxyZWN0IGlkPSJDb250YWluZXJfNHB4X1BhZGRpbmciIGRhdGEtbmFtZT0iQ29udGFpbmVyIDRweCBQYWRkaW5nIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIGZpbGw9Im5vbmUiLz4KICA8L2c+CiAgPGcgaWQ9Imljb25zX1EyIiBkYXRhLW5hbWU9Imljb25zIFEyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0IDgpIj4KICAgIDxnIGlkPSJHcm91cF8zNDMzOSIgZGF0YS1uYW1lPSJHcm91cCAzNDMzOSI+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzE1NzI2NiIgZGF0YS1uYW1lPSJQYXRoIDE1NzI2NiIgZD0iTTQ2LjAzMiwxNC45NjQsNzkuMjgsNzUuMDUxaC02Ni4zTDQ2LjAzMiwxNC45NjRNMi41NjksNzcuMDU0YTQuMDA2LDQuMDA2LDAsMCwwLDMuNCw2LjAwOUg4Ni4wOWE0LjAwNiw0LjAwNiwwLDAsMCwzLjQtNi4wMDlMNDkuNDM3LDQuOTQ5YTQuMDA2LDQuMDA2LDAsMCwwLTYuODEsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yLjAzMiAtMy4wNTQpIiBmaWxsPSIjZTU0MzYwIi8+CiAgICAgIDxwYXRoIGlkPSJQYXRoXzE1NzI2NyIgZGF0YS1uYW1lPSJQYXRoIDE1NzI2NyIgZD0iTTIyLDIxLjAwNlYzOS4wMzJhNC4wMDYsNC4wMDYsMCwxLDAsOC4wMTIsMFYyMS4wMDZhNC4wMDYsNC4wMDYsMCwxLDAtOC4wMTIsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3Ljk5NCAxMC45MzMpIiBmaWxsPSIjZTU0MzYwIi8+CiAgICAgIDxjaXJjbGUgaWQ9IkVsbGlwc2VfMzQ4MiIgZGF0YS1uYW1lPSJFbGxpcHNlIDM0ODIiIGN4PSI0LjAwNiIgY3k9IjQuMDA2IiByPSI0LjAwNiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkuOTk0IDU3Ljk3NykiIGZpbGw9IiNlNTQzNjAiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo="
              alt="iK-Load-Animation"
            />
            {<p>{`${id} collection handle does not exist`}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
